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

class PageTest extends Component {
  constructor(props) {
    super(props);
    this.state = { content: '' };
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

  render() {
  const s3Conf = Meteor.settings.public.keys.s3 || {};
  if (s3Conf) {


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
  let path = "avatars/rPuBFBndLzQAgR8Ch_4R2xMLQ63haK8Wp6p.jpg"

  let params = {
    Bucket: s3Conf.bucket,
    Key: path,
    Expires: 60
  }
  let url = s3.getSignedUrl('getObject', params);
  console.log('The URL is', url);
}
    return (
    

    <div>
    <form>
    <EditAvatarButton />
    <VenuesForm/>
    </form>
      </div>
    )
  }
};
    
export default PageTest;

