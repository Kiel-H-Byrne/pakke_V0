import React, { Component } from 'react';
import axios from 'axios';

import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';


export default class AxiosUpload extends Component {
  state ={
    selectedFile: null
  }

  fileChangedHandler = event => {
    const file = event.target.files[0]
    this.setState({selectedFile: event.target.files[0]})
    console.log(this)

  }

  uploadHandler = event => {
    console.log(this)
    axios.post(this.props.endpoint, this.state.selectedFile, {
      onUploadProgress: progressEvent => {
        console.log(progressEvent);
        console.log(progressEvent.loaded / progressEvent.total)
      }
    })

  }
  render() {
    return (
            <div>
      <Input type="file" accepts="images/*" onChange={this.fileChangedHandler} />
      <Button onClick={this.uploadHandler}>Upload!</Button>
      </div>
    );
  }
}