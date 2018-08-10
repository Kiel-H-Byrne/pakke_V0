import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Random } from 'meteor/random';

import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit'

const styles = {
  editIcon: {
    color: 'white',
    position: 'relative',
    top: -3
  },
  hiddenInput: {
    display: 'inherit'
  } 
}
class EditAvatarButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uploading: false,
      selectedFile: {},
      fileData: null
    };

    this.uploadIt = this.uploadIt.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (e) => {
    e.preventDefault()
    //dispatchEvent click to #avatar_input
    const event = new MouseEvent("click");
    avatar_input.dispatchEvent(event)
  }

  uploadIt = event => {
    event.preventDefault();
    this.setState({'uploading': true});
    //GET INPUT FILE
    const file = event.target.files[0];
    this.setState({'selectedFile': file});
    // console.log(file);
    
    //USE FILEREADER TO GET RAW IMG SRC FOR PREVIEW
    let reader = new FileReader();
    reader.onload = evt => {
      // console.log(evt.target.result)
      //result is the DataURL (base64 string)
      let dataurl = evt.target.result;
      //SET TO STATE FOR USE AS PREVIEW IMAGE SOURCE
      this.setState({'uploading': false});
      this.setState({'fileData': dataurl});
      //upload to s3 and get url for the form's value;
      // const s3path = `https://s3.amazonaws.com/${Meteor.settings.public.keys.s3.bucket}/api/${this.props.module}/${Random.id(6)}${file.name}`
      const key = `${Meteor.userId()}/avatars/${Random.id(6)}${file.name}`
      const s3path = `https://s3.amazonaws.com/${Meteor.settings.public.keys.s3.bucket}/${key}`
      //SET FINAL IMG URL TO STATE TO USE IN FORM HIDDEN FIELD
      this.setState({'s3path': encodeURI(s3path)})
      //UPLOAD TO S3
      Meteor.call('s3Upload', key, file.type, dataurl);
      Meteor.users.update(
          {_id: Meteor.userId()}, 
          {$set: {
            "profile.avatar": s3path
          }
        });
    }
    //CALL FILEREADER EVENT
    reader.readAsDataURL(file)
  }

  render() {
    return (
      <div>
        <input type="file" id="avatar_input" hidden ref="avatar_input" onChange={this.uploadIt} style={{display:'none'}}/>
        <Button variant="fab" size="small" onClick={this.handleClick} style={{backgroundColor: "rgba(0,0,0,.6)"}}><EditIcon style={styles.editIcon} /></Button>
      </div>
    );
  }
}

export default EditAvatarButton