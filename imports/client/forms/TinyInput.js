import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';

import HiddenField from 'uniforms-material/HiddenField'; 
import Button from '@material-ui/core/Button';


class TinyInput extends Component {
  constructor(props) {
    super(props);
    this.state = { content: props.content || 'Describe this Event:' };
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  handleEditorChange(content) {
    this.setState({ content });
  }
  
  render() {
    return (
      <div>
        <HiddenField
        id="tiny-description"  
        name={this.props.name} style={{height: 164}}
        value={this.state.content}/>
        <Editor
          apiKey={Meteor.settings.public.keys.tinymce.key}
          init={{
            selector: "#tiny-description",
            plugins: 'link, lists, textpattern, emoticons, paste',
            toolbar: 'undo redo paste | styleselect fontselect bold italic | bullist numlist | link emoticons  ',
            fontsize_formats: "10pt 12pt 14pt 18pt",
            resize:false,
            menubar: false,
            branding: false,
            id: "tiny-description"
          }}
          onEditorChange={this.handleEditorChange}
          value={this.state.content}
        />
      </div>
    )
  }
};
    
export default TinyInput;

