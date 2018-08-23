import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Editor } from '@tinymce/tinymce-react';
import S3 from 'aws-sdk/clients/s3';
import MaskedInput from 'react-text-mask'

import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

import FileUpload from '../forms/FileUpload.js';
import EditAvatarButton from '../header/EditAvatarButton.js'
// import UserFiles from '../../startup/collections/files';
import AddEventForm from '../forms/AddEventForm2';
import AutoComplete from '../forms/AutoComplete';


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
  

  render() {
    const numberFormat = (str: string) => {
      const r = parseInt(str.replace(/[^\d]+/gi, ''), 10);
      return r ? r.toLocaleString('en') : '';
    }

    return (
    
    <div>
    <p></p>
    <hr style={{width:"80%"}}/>
    <AddEventForm />
    
      </div>
    )
  }
};
    
export default PageTest;

