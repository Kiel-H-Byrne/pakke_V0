import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Editor } from '@tinymce/tinymce-react';
import S3 from 'aws-sdk/clients/s3';

import Button from '@material-ui/core/Button';

import FileUpload from '../forms/FileUpload.js';
import EditAvatarButton from '../header/EditAvatarButton.js'
// import UserFiles from '../../startup/collections/files';
import VenuesForm from '../forms/VenuesForm';

import TinyInput from '../forms/TinyInput.js'
import AxiosUpload from './axiosUpload.js'

class PageTest extends Component {
  constructor(props) {
    super(props);
    this.state = { content: '', endPoint: null };
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleEditorChange = (content) => {
    console.log('Content was updated:', content);
    this.setState({ content });
  }
  
  onSubmit = (e) => {
    console.log(e);
  }
  componentDidMount() {
    const s3Conf = Meteor.settings.public.keys.s3;

    const s3 = new S3({
      secretAccessKey: s3Conf.secret,
      accessKeyId: s3Conf.key,
      // sslEnabled: true, // optional
      httpOptions: {
        timeout: 6000,
        agent: false
      }
    });
    // let path = `avatars/${fileRef.meta.userId}/${fileRef._id}.${fileRef.extension}`;
    // let path = `${module}/${fileRef._id}.${fileRef.extension}`;
    let path = "events/kbfile"

    let params = {
      Bucket: s3Conf.bucket,
      Key: path,
      Expires: 20,
      // ContentType: fileType
    }
    const sUrl = s3.getSignedUrl('putObject', params, (err, url) => {
      if (url) {
        console.log('The URL is', url);
        this.setState({endPoint: url})
      }
    });
   }

  render() {
    
    return (
    
    <div>
    <p></p>
    <hr/>

   {this.state.endPoint ? <FileUpload endPoint={this.state.endPoint}/>  : "Loading..." }

      </div>
    )
  }
};
    
export default PageTest;

