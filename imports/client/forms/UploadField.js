import React, { Component } from 'react';
import PropTypes from 'prop-types';
//
import { Meteor } from 'meteor/meteor';
import {_} from 'meteor/underscore';
//
import connectField from 'uniforms/connectField';
//
import EventImages from '/imports/startup/collections/eventImages.js';

class UploadFieldComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploading: [],
      progress: 0,
      inProgress: false,
      uploadState: null,
      uploadError: null,
      files: []
    };
    // this.uploadFile = this.uploadFile.bind(this)
    this.uploadIt = this.uploadIt.bind(this)
  }
  setUploadProgress(progress) {
    this.setState({
      progress: progress
    });
  }
  setUploadState(uploadState) {
    this.setState({
      uploadState: uploadState
    });
  }
  setUploadError(error){
    this.setState({
      uploadError: error
    });
  }

  uploadFile(self, file, _onUploadDone) {

    if (file) {
      let uploadInstance = EventImages.insert({
        file: file,
        meta: {
          locator: self.props.fileLocator,
          userId: Meteor.userId() // Optional, used to check on server for file tampering
        },
        streams: 'dynamic',
        chunkSize: 'dynamic',
        allowWebWorkers: true // If you see issues with uploads, change this to false
      }, false);

      self.setState({
        uploading: uploadInstance, // Keep track of this instance to use below
        inProgress: true // Show the progress bar now
      });

      // These are the event functions, don't need most of them, it shows where we are in the process
      uploadInstance.on('progress', function (progress, fileObj) {
        console.log('Upload Percentage: ' + progress);
        // Update our progress bar
        self.setUploadProgress(progress);
      });

      uploadInstance.on('start', function () {
        console.log('Starting');
        self.setUploadState('uploading');
      });

      uploadInstance.on('end', function (error, fileObj) {
        self.setUploadState(null);
        self.setUploadError(error);
        _onUploadDone(error, fileObj);
      });

      uploadInstance.on('error', function (error, fileObj) {
        console.log('Error during upload: ' + error);
        self.setState({
          uploadError: {
            message: error
          }
        })
      });

      uploadInstance.on('uploaded', function (error, fileObj) {
        console.log('uploaded: ', fileObj);
        
        // Remove the filename from the upload box

        console.log(self.refs)
        // self.refs['fileinput'].value = fid;

        // Reset our state for the next file
        self.setState({
          uploading: [],
          progress: 0,
          inProgress: false
        });
          
      });

      uploadInstance.start(); // Must manually start the upload
    }

  }

  setValue(fileObj) {
    const valueData  = {
      xfileId : fileObj._id,
      xfileCollection : fileObj._collectionName
    };
    // set data to model
    this.props.onChange(valueData);
  }
  onUploadDone(err,fileObj){
    console.log('On end File Object: ', fileObj);

    if(fileObj) {
      const valueData  = {
        xfileId : fileObj._id,
        xfileCollection : fileObj._collectionName
      };
      // this.setValue(fileObj);
      console.log('success; uploaded=' + fileObj.name );
      console.log(self.props);
      /*
      this.props.value.xfileId = fileObj._id;
      this.props.value.xfileCollection = fileObj._collectionName;
      console.log('this.props.value=',this.props.value);
      */
    } else {
      console.log(error.message);
      console.error(error);
      throw new Meteor.Error('upload-file-fail', error);
    }

  }
  uploadIt(e){
    "use strict";
    e.preventDefault();

    let self = this;

    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case
      // there was multiple files selected
      const file = e.currentTarget.files[0];
      self.uploadFile(self, file, self.onUploadDone);
    }
  }

  // This is our progress bar, bootstrap styled
  // Remove this function if not needed
  showUploads() {
    console.log('**********************************', this.state.uploading);
    console.log('showing',this.props.xfileId);
    console.log('showing',this.props.xfileCollection);

    if (!_.isEmpty(this.state.uploading)) {
      return <div>
        {this.state.uploading.file.name}

        <div className="progress progress-bar-default">
          <div style={{width: this.state.progress + '%'}} aria-valuemax="100"
             aria-valuemin="0"
             aria-valuenow={this.state.progress || 0} role="progressbar"
             className="progress-bar">
            <span className="sr-only">{this.state.progress}% Complete (success)</span>
            <span>{this.state.progress}%</span>
          </div>
        </div>
        {/*
            {this.state.inProgress ?
              <div>Uploading... {this.state.progress}</div> :
            }
            <div>
              {this.value ? <textarea>{this.value}</textarea> : null}
            </div>
            <div>
              {this.state.uploadError ? <p>{this.state.uploadError.message}</p> : null}
            </div>
            ---------


            {uploadState === 'uploading' ?
              <div>Uploading... {uploadProgress}</div> :
              <div>
                {value ? <CollectionImage aspectRatio={aspectRatio} imageId={value} /> : null}
              </div>
            }

            ---------

            {uploadError ? <p>{uploadError.message}</p> : null}

        */}
      </div>
    }
  }

  showWidget() {
    let widget;
    const renderType = 'fileWidget';//'buttonWidget';
    if('fileWidget' == renderType) {
      widget = (
        <input type="file"
          id={this.props.id}
          name={this.props.name}
          disabled={this.state.inProgress}
          ref="fileinput"
          onChange={this.uploadIt}
        />
    );
    } else if('buttonWidget' == renderType ) {
      widget = (
        <section className="upload-container">
          <input type="file"
            id={this.props.id}
            name={this.props.name}
            disabled={this.state.inProgress}
            ref="fileinput"
            onChange={this.uploadIt}
            style={{display:'none'}}
          />
          <div className='buttons'>
            <a onClick={this.handleClick.bind(this)}>
              { this.state.uploading ? <T>upload.uploading</T> : <T>upload.chooseFile</T> }
            </a> <span className='font-smaller'>{this.renderSpecs()}</span>
          </div>
        </section>
      );
    }
    return widget;

  }

  render() {
      return (
        <div>
          <div className="row">
            <div className="col-md-12">
              <p>{this.props.label && (
                <span>{this.props.label}</span>
              )}</p>
              <div className="upload-field">
                {this.showWidget()}
              </div>
            </div>
          </div>

        </div>
      )
  }
}


UploadFieldComponent.propTypes = {
    value: PropTypes.object
};

export default UploadField = connectField(UploadFieldComponent, {
  mapProps: props => props
});