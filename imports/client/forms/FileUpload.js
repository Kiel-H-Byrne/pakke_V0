import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { _ } from 'underscore';
import S3 from 'aws-sdk/clients/s3';


import HiddenField from 'uniforms-material/HiddenField';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'

import { BarLoader } from 'react-spinners';
// import VenueImages from '/imports/startup/collections/VenueImages.js';
import FileDetails from '/imports/client/forms/FileDetails.js';


export default class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploading: false,
      selectedFile: {},
      fileData: null
    };

    this.putIt = this.putIt.bind(this);
  }

  putIt = event => {
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
      const key = `${Meteor.userId()}/${this.props.module}/${Random.id(6)}${file.name}`
      const s3path = `https://s3.amazonaws.com/${Meteor.settings.public.keys.s3.bucket}/${key}`
      //SET FINAL IMG URL TO STATE TO USE IN FORM HIDDEN FIELD
      this.setState({'s3path': encodeURI(s3path)})
      //UPLOAD TO S3
      Meteor.call('s3Upload', key, file.type, dataurl);
    }
    //CALL FILEREADER EVENT
    reader.readAsDataURL(file)
  }

  handleClick = (evt) => {
    //dispatchEvent click to #avatar_input
    evt.preventDefault();
    const event = new MouseEvent("click");
    const elem=document.getElementById(`file_input_${this.props.module}`)  
    console.log(elem)
    elem.dispatchEvent(event)
  }
  // This is our progress bar, bootstrap styled
  // Remove this function if not needed
  showProgress = () => {
    // console.log('**********************************', this.state.uploading);

    if (this.state.uploading) {
      return <BarLoader 
            loading={this.state.uploading} 
            color='#2964ff'
            width={-1}
            height={10}
          />
    }
  } 

  preview = () => {
    if (this.state.fileData) {
      const datauri  = this.state.fileData
      const aFile = this.state.selectedFile;
      const aFileData = this.state.fileData;
      return (
        <FileDetails
        fileName={aFile.name}
        fileUrl={datauri}
        fileSize={aFile.size}
        fileExt={aFile.extension}
        s3path={this.state.s3path}
        clearFile={() => this.setState({fileData: ''})}
        /> 
        )
      } else if (this.props.value) {
        return (
          <img width="120px" src={this.props.value}/>)
      }
    }

  render() {
    if (this.props.loading) {
      return (
        <BarLoader 
            loading={this.props.loading} 
            color='#2964ff'
            width={-1}
            height={10}
          />
      )
    }

      return (
      <Grid container direction="column">
        <Grid item xs={12}>
          <HiddenField name={this.props.name} value={this.state.s3path ? this.state.s3path : this.props.value} />
          <input type="file" id={`file_input_${this.props.module}`} hidden ref={`file_input_${this.props.module}`} onChange={this.putIt} accept="image/*"/>
          <Button variant="fab" mini onClick={this.handleClick}><AddAPhotoIcon/></Button>
        </Grid>

        <Grid item xs={12} className="">
            {this.showProgress()}
        </Grid>

        <Grid item xs={12} className="">
            {this.preview()}
        </Grid>

      </Grid>
  )}
}

//
// This is the HOC - included in this file just for convenience, but usually kept
// in a separate file to provide separation of concerns.
//
