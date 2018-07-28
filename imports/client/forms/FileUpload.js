import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { _ } from 'underscore';
import axios from 'axios';
import S3 from 'aws-sdk/clients/s3';
import ReactS3Uploader from 'react-s3-uploader';


import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';


import { BarLoader } from 'react-spinners';
// import VenueImages from '/imports/startup/collections/VenueImages.js';
import IndividualFile from '/imports/client/forms/FileDetails.js';


export default class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploading: [],
      progress: 0,
      inProgress: false,
      selectedFile: null,
      endPoint: ''
    };

    this.uploadIt = this.uploadIt.bind(this);
  }
  generateSignedUrl = event => {
    // console.log(event);
    const file = event.currentTarget.files[0];
    this.setState({selectedFile: file});
    const s3Conf = Meteor.settings.public.keys.s3;
  
    const s3 = new S3({
      accessKeyId: s3Conf.key,
      secretAccessKey: s3Conf.secret
    });

    // let path = `avatars/${fileRef.meta.userId}/${fileRef._id}.${fileRef.extension}`;
    // let path = `${module}/${fileRef._id}.${fileRef.extension}`;
    let path = `api/uploads/${file.name}`

    let params = {
      ServerSideEncryption: 'AES256', // Optional
      // StorageClass: 'STANDARD',
      Bucket: s3Conf.bucket,
      Key: path,
      Expires: 3600,
      ACL: 'bucket-owner-full-control',
      // ACL: 'public-read',
      ContentType: file.type,
    }

    // console.log(params)
    s3.getSignedUrl('putObject', params, (err, url) => {
      if (err) {
        console.log('Error getting presigned', err)
      } else {
        console.log('The URL is', url);
        this.setState({endPoint: url})
        // return url;
      }
    });
  }

  putIt = event => {
    // event.preventDefault();
    const file = event.target.files[0];
    console.log(file);
    Meteor.call('s3Upload', file);
  }
  uploadIt(e) {
    e.preventDefault();
    // let self = this;
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case
      // there was multiple files selected
      // const file = e.target.files[0]
      const file = e.currentTarget.files[0];
      this.setState({selectedFile: file})

      // let uploadInstance = Avatars.insert({
      //   file: file,
      //   meta: {
      //     locator: self.props.fileLocator,
      //     userId: Meteor.userId() // Optional, used to check on server for file tampering
      //   },
      //   streams: 'dynamic',
      //   chunkSize: 'dynamic',
      //   onStart: () =>  {
      //     // console.log('Starting');
      //   },
      //   onUploaded: (error, fileRef) => {
      //     // console.log('uploaded: ', fileRef);

      //     // Remove the filename from the upload box
      //     self.refs['fileinput'].value = '';
      //     // console.log(self)

      //     // Reset our state for the next file
      //     self.setState({
      //       file: file,
      //       uploading: [],
      //       progress: 0,
      //       inProgress: false
      //     });
      //   },
      //   onError: (error, fileData) => {
      //     console.warn('Error during upload: ' + error)
      //   },
      //   onProgress: (progress, fileData) => {
      //     console.log(`Upload Percentage: ${progress}%`)
      //     // Update our progress bar
      //     self.setState({
      //       progress: progress
      //     });
      //   }
      // }, false );
    // })
      
      // self.setState({
      //   uploading: uploadInstance, // Keep track of this instance to use below
      //   inProgress: true // Show the progress bar now
      // });
    }
  }

  uploadHandler = event => {
    // console.log(this)e
    let file = this.state.selectedFile;
    let reader = new FileReader();
    reader.onload = evt => {

      axios.post(this.state.endPoint, evt.target.result, {
        onUploadProgress: progressEvent => {
          this.setState({uploading: true})
          let status = progressEvent.loaded / progressEvent.total
          if (status < 1) {
            this.setState({inProgress: true})
            this.setState({progress: status})
          } else if (status == 1) {
            this.setState({uploading: false, inProgress: false})
          }
        }
      })
    };
    reader.readAsBinaryString(file);


  }

  fetchIt = event => {
    let formData = new FormData();
    formData.append('image', this.state.selectedFile);
    fetch(this.state.endPoint, {
      method: 'PUT',
      body: formData
    })
    .then(response => response.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
  }
  // This is our progress bar, bootstrap styled
  // Remove this function if not needed
  showProgress = () => {
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
      let aFile = this.state.selectedFile;

      // Run through each file that the user has stored
      // (make sure the subscription only sends files owned by this user)
      let preview = () => {(<IndividualFile
        fileName={aFile.name}
        fileUrl={link}
        fileId={aFile._id}
        fileSize={aFile.size}
        fileExt={aFile.extension}
      />)}
      // let preview = fileCursors.map((aFile, key) => {
      //   // console.log('A file: ', aFile)
      //   let link = Avatars.findOne({_id: aFile._id}).link();  //The "view/download" link
      //   // console.log(link);
      //   // Send out components that show details of each file
      //   return <div key={'file' + key}>
      //     <IndividualFile
      //       fileName={aFile.name}
      //       fileUrl={link}
      //       fileId={aFile._id}
      //       fileSize={aFile.size}
      //       fileExt={aFile.extension}
      //     />
      //   </div>
      // })

      return (
      <Grid container direction="column">
        <Grid item xs={12}>
            <input type="file" id="fileinput" size="large" color="secondary"  disabled={this.state.inProgress} ref="fileinput" onChange={this.generateSignedUrl} accept="image/*"/>
            {/**/}
            <Button onClick={this.uploadHandler}>Upload!</Button> 
            {/*
            <ReactS3Uploader
            getSignedUrl={this.generateSignedUrl}
            accept="image/*"
            // preprocess={this.onUploadStart}
            // onSignedUrl={this.onSignedUrl}
            // onProgress={this.showProgress}
            // onError={this.onUploadError}
            // onFinish={this.onUploadFinish}
            // signingUrlHeaders={{ additional: headers }}
            // signingUrlQueryParams={{ additional: query-params }}
            // signingUrlWithCredentials={ true }      // in case when need to pass authentication credentials via CORS
            uploadRequestHeaders={{ 'x-amz-acl': 'public-read' }}  // this is the default
            contentDisposition="auto"
            scrubFilename={(filename) => filename.replace(/[^\w\d_\-.]+/ig, '')}
            // server="http://cross-origin-server.com"
            // inputRef={cmp => this.uploadInput = cmp}
            autoUpload={true}
          />
*/}
        </Grid>

        <Grid item xs={12} className="">
            {this.showProgress()}
        </Grid>

      </Grid>
  )}
}

//
// This is the HOC - included in this file just for convenience, but usually kept
// in a separate file to provide separation of concerns.
//
