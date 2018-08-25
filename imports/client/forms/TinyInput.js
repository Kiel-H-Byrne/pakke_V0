import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';

import HiddenField from 'uniforms-material/HiddenField'; 
import Button from '@material-ui/core/Button';


class TinyInput extends Component {
  constructor(props) {
    super(props);
    this.state = { content: props.content || '' };
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  handleEditorChange(content) {
    this.setState({ content });
  }
  
  render() {
    return (
      <React.Fragment>
        <HiddenField
        id={`tiny-description_${this.props.name}`}  
        name={this.props.name} style={{height: 164}}
        value={this.state.content}/>
        <Editor
          apiKey={Meteor.settings.public.keys.tinymce.key}
          init={{
            selector: `#tiny-description_${this.props.name}`,
            plugins: 'link, lists, textpattern, emoticons, paste, image',
            toolbar: 'undo redo paste | styleselect fontselect bold italic | bullist numlist | link image emoticons  ',
            fontsize_formats: "10pt 12pt 14pt 18pt",
            resize: false,
            menubar: false,
            contextmenu: false,  
            branding: false,
            browser_spellcheck: true,
            images_upload_handler:  function (blobInfo, success, failure) {
              console.log(blobInfo)
              if (failure) {
                console.log(failure())
              } else {
                console.log(blobInfo)
              }
            }
          }}
          onEditorChange={this.handleEditorChange}
          value={this.state.content}
        />
      </React.Fragment>
    )
  }
};
    
export default TinyInput;

