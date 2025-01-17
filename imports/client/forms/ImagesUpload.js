import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { _ } from 'underscore';
import { BarLoader } from 'react-spinners';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';

import HiddenField from 'uniforms-material/HiddenField'; 

import Uploads from '/imports/startup/collections/uploads.js';
import IndividualFile from '/imports/client/forms/FileDetails.js';


class ImagesUploadComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploading: [],
      progress: 0,
      inProgress: false,
      file: {},
      fileUrl: props.fileUrl || ''
    };

    this.uploadIt = this.uploadIt.bind(this);
  }

  uploadIt(e) {
    e.preventDefault();

    let self = this;

    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case
      // there was multiple files selected
      let file = e.currentTarget.files[0];
      // console.log(file);
        
      let uploadInstance = Uploads.insert({
        file: file,
        meta: {
          userId: Meteor.userId() // Optional, used to check on server for file tampering
        },
        streams: 'dynamic',
        chunkSize: 'dynamic',
        onStart: () =>  {
          // console.log('Starting');
        },
        onUploaded: (error, fileRef) => {
          // console.log('uploaded: ', fileRef);
          // Remove the filename from the upload box
          self.refs['fileinput'].value = '';
          // console.log(self)
          let filePath = `venues/${fileRef.meta.userId}_${fileRef._id}.${fileRef.extension}`;
          let url = `https://s3.us-east-2.amazonaws.com/pakke-images/${filePath}`
          // Reset our state for the next file
          self.setState({
            file: file,
            uploading: [],
            progress: 0,
            inProgress: false,
            fileUrl: url
          });
        },
        onError: (error, fileData) => {
          console.warn('Error during upload: ' + error)
        },
        onProgress: (progress, fileData) => {
          console.log(`Upload Percentage: ${progress}%`)
          // Update our progress bar
          self.setState({
            progress: progress
          });
        }
      }, false );

      uploadInstance.start()
      
      self.setState({
        uploading: uploadInstance, // Keep track of this instance to use below
        inProgress: true // Show the progress bar now
      });
    }
  }

  // This is our progress bar, bootstrap styled
  // Remove this function if not needed
  showProgress() {
    // console.log('**********************************', this.state.uploading);

    if (!_.isEmpty(this.state.uploading)) {
      return <div>
        {this.state.uploading.file.name}

        <div className="progress progress-bar-default">
          <div style={{width: this.state.progress + '%', 'backgroundColor':'#2964ff' }} aria-valuemax="100"
             aria-valuemin="0"
             aria-valuenow={this.state.progress || 0} role="progressbar"
             className="progress-bar">
            <span className="sr-only">{this.state.progress}% Complete (success)</span>
            <span>{this.state.progress}%</span>
          </div>
        </div>
      </div>
    }
  }

  render() {
    if (this.props.loading) {
      return (
        <BarLoader 
        loading={this.props.loading} 
        color='#2964ff'
        width={-1}
        height={10}
        />
      )
    }
      
      // Run through each file that the user has stored
      // (make sure the subscription only sends files owned by this user)
      let preview = this.props.files.map((aFile, key) => {
        // console.log('A file: ', aFile)
        let link = Uploads.findOne({_id: aFile._id}).link();  //The "view/download" link
        // console.log(link);
        // Send out components that show details of each file
        return <div key={'file' + key}>
          <IndividualFile
            fileName={aFile.name}
            fileUrl={link}
            fileId={aFile._id}
            fileSize={aFile.size}
            fileExt={aFile.extension}
          />
        </div>
      })

      return (
              <React.Fragment>
        <HiddenField
        id="ImageInputUrl"  
        name={this.props.name}
        value={this.state.fileUrl}/>  
      <Grid container direction="column">
        <Grid item xs={12}>
            <Input type="file" id="fileinput" size="large"  disabled={this.state.inProgress} ref="fileinput" onChange={this.uploadIt}/>
        </Grid>

        <Grid item xs={12} className="">
            {this.showProgress()}
        </Grid>

        <Grid item xs={12}>
            {/* <img src={this.state.fileUrl} alt="file preview" height="100px" width="100px"/> */}
            {preview}
        </Grid>
      </Grid>
      </React.Fragment>
  )}
}

//
// This is the HOC - included in this file just for convenience, but usually kept
// in a separate file to provide separation of concerns.
//
export default ImagesUpload = withTracker( ( props ) => {
  const filesHandle = Meteor.subscribe('my_uploads');
  const loading = !filesHandle.ready();
  const files = Uploads.find({}, {sort: {name: 1}}).fetch();

  return {
    loading,
    files,
  };
})(ImagesUploadComponent);