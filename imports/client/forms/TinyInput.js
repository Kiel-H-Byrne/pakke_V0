import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import S3 from 'aws-sdk/clients/s3';

import HiddenField from 'uniforms-material/HiddenField'; 
import Button from '@material-ui/core/Button';

// =========================================================================================================
// =========================================================================================================
// * this workaround allows tinyinput window to accept values in links and image upload (and probably others)
// * thanks @harry: http://stackoverflow.com/questions/18111582/tinymce-4-links-plugin-modal-in-not-editable
// =========================================================================================================
$(document).on('focusin', function(e) {
    if ($(e.target).closest(".mce-window").length) {
        e.stopImmediatePropagation();
    }
});
// =========================================================================================================
// =========================================================================================================
// =========================================================================================================

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
            plugins: 'link lists textpattern emoticons paste image autolink media preview',
            toolbar: 'undo redo paste | styleselect fontselect | forecolor bold italic | bullist numlist | link image media emoticons preview  ',
            default_link_target: "_blank",
            fontsize_formats: "10pt 12pt 14pt 18pt",
            media_dimensions: false,
            resize: false,
            paste_data_images: true,
            image_advtab: true,
            menubar: false,
            contextmenu: false,  
            branding: false,
            browser_spellcheck: true,
            images_upload_handler:  function (blobInfo, success, failure) {
              // upload to s3 with name, and then what? how do i get it in the tinymce?
              let reader = new FileReader();
              let file = blobInfo.blob();
              reader.onload = evt => {
                // console.log(evt.target.result)
                //result is the DataURL (base64 string)
                let dataurl = evt.target.result;
                //upload to s3 and get url for the form's value;
                // const s3path = `https://s3.amazonaws.com/${Meteor.settings.public.keys.s3.bucket}/api/${this.props.module}/${Random.id(6)}${file.name}`
                const key = `${Meteor.userId()}/attachments/${Random.id(6)}${file.name}`
                const s3path = `https://s3.amazonaws.com/${Meteor.settings.public.keys.s3.bucket}/${key}`
                //UPLOAD TO S3
                Meteor.call('s3Upload', key, file.type, dataurl);
                setTimeout(success(s3path), 1000)
              }
              //CALL FILEREADER EVENT
              reader.readAsDataURL(file)
              //set value of associated tinymce input to image uri?
              //then call success(with image uri as string) or failure(with fail message as string)
              
              // if (failure) {
              //   console.log(failure)
              // } else {
              //   console.log(blobInfo)
              // }
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

