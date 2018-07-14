import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Editor } from '@tinymce/tinymce-react';

import Button from '@material-ui/core/Button';

import FileUpload from '../forms/FileUpload.js';
import EditAvatarButton from '../header/EditAvatarButton.js'
// import UserFiles from '../../startup/collections/files';

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

    return (
    
    // <FileUpload />
    <div>
    <EditAvatarButton />
    <form>
    <TinyInput />
      <Button type="submit"> Submit </Button>
    </form>
      </div>
    )
  }
};
    
export default PageTest;

