import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Editor } from '@tinymce/tinymce-react';

import FileUpload from '../forms/FileUpload';
import EditAvatarButton from '../header/EditAvatarButton.js'
// import UserFiles from '../../startup/collections/files';

class PageTest extends Component {
  handleEditorChange = (e) => {
    console.log('Content was updated:', e.target.getContent());
  }

  render() {

    return (
    
    // <FileUpload />
    <div>
    <EditAvatarButton />
    <Editor
        apiKey={Meteor.settings.public.keys.tinymce.key}
        initialValue="<p>This is the initial content of the editor</p>"
        init={{
          selector: "textarea",
          plugins: 'link',
          toolbar: 'undo redo | bold italic | bullist numlist | link  ',
          menubar: false,
          resize: false,
          branding: false
        }}
        onChange={this.handleEditorChange}
      />
      </div>
    )
  }
};
    
export default PageTest;

