import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React, { Component } from 'react';

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
class EditAvatarButtonComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uploading: [],
      progress: 0,
      inProgress: false,
      file: {},
      fileUrl: ''
    };

    this.uploadIt = this.uploadIt.bind(this);
    this.handleClick = this.handleClick.bind(this);


  }

  handleClick = () => {
    //dispatchEvent click to #avatar_input
    let event = new MouseEvent("click");
    avatar_input.dispatchEvent(event)
  }

  uploadIt(e) {
    e.preventDefault();

    let self = this;

    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case
      // there was multiple files selected
      let file = e.currentTarget.files[0];

      let uploadInstance = Avatars.insert({
        file: file,
        meta: {
          userId: Meteor.userId() // Optional, used to check on server for file tampering
        },
        streams: 'dynamic',
        chunkSize: 'dynamic',
        onStart: () =>  {
          // console.log('Starting');
        },
        onUploaded: (error, fileRef) => {
          console.log('uploaded: ', fileRef);
          // Remove the filename from the upload box
          // self.refs['avatar_input'].value = '';
          
          let filePath = `avatars/${fileRef.meta.userId}_${fileRef._id}.${fileRef.extension}`;
          let url = `https://s3.us-east-2.amazonaws.com/pakke-images/${filePath}`
          // Reset our state for the next file
          self.setState({
            file: fileRef,
            uploading: [],
            progress: 0,
            inProgress: false,
            fileUrl: url
          });
        },
        onError: (error, fileData) => {
          console.warn('Error during upload: ' + error)
        },
        onProgress: (progress, fileData) => {
          console.log(`Upload Percentage: ${progress}%`)
          // Update our progress bar
          self.setState({
            progress: progress
          });
        }
      }, false );

      uploadInstance.start()
      
      self.setState({
        uploading: uploadInstance, // Keep track of this instance to use below
        inProgress: true // Show the progress bar now
      });
    }
  }
  render() {
    return (
      <div>
      <input type="file" id="avatar_input" hidden ref="avatar_input" onChange={this.uploadIt} style={{display:'none'}}/>
      <EditIcon onClick={this.handleClick}/>
      </div>
    );
  }
}


export default EditAvatarButton = withTracker( ( props ) => {
  const filesHandle = Meteor.subscribe('curent_user');
  const loading = !filesHandle.ready();
  const user = Meteor.user();
  const files = Avatars.find({
    'meta.userid': Meteor.userId()
  }, {sort: {name: 1}}).fetch();

  return {
    loading,
    files,
  };
})(EditAvatarButtonComponent);
