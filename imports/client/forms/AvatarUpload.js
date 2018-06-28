import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { _ } from 'underscore';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';

import Avatars from '/imports/startup/collections/avatars';
import IndividualFile from '/imports/client/forms/FileDetails.js';

class AvatarUploadComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uploading: [],
      progress: 0,
      inProgress: false,
      file: {}
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
       
      let uploadInstance = Avatars.insert({
        file: file,
        meta: {
          collection: self.props.collection,
          userId: Meteor.userId() // Optional, used to check on server for file tampering
        },
        streams: 'dynamic',
        chunkSize: 'dynamic',
        onStart: () =>  {
          // console.log('Starting');
        },
        onUploaded: (error, fileRef) => {
          console.log('uploaded: ', fileRef);

          // Remove the filename from the upload box
          self.refs['fileinput'].value = fileRef._id;

          // Reset our state for the next file
          self.setState({
            file: fileRef,
            uploading: [],
            progress: 0,
            inProgress: false
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
    let preview;
    if (this.state.file) {
      let aFile = this.state.file
      // let link = Avatars.find({ _id: aFile._id }).link();

      preview = () => (
        <IndividualFile
              fileName={aFile.name}
              fileId={aFile._id}
              fileSize={aFile.size}
              fileExt={aFile.extension}
            />
                         )
      
    }
    
      return (
      <Grid container direction="column">
        <Grid item xs={12}>
            <Input type="file" id="fileinput" size="large" color="secondary"  disabled={this.state.inProgress} ref="fileinput" onChange={this.uploadIt}/>
        </Grid>

        <Grid item xs={12} className="">
            {this.showProgress()}
        </Grid>

        <Grid item xs={12}>
          <Grid container direction="row">
            {/*preview*/}
          </Grid>
        </Grid>
      </Grid>
  )}
}

//
// This is the HOC - included in this file just for convenience, but usually kept
// in a separate file to provide separation of concerns.
//
export default AvatarUpload = withTracker( ( props ) => {
  const filesHandle = Meteor.subscribe('avatars');
  const docsReadyYet = filesHandle.ready();
  let collection = 'avatars'

  return {
    docsReadyYet,
    collection
  };
})(AvatarUploadComponent);