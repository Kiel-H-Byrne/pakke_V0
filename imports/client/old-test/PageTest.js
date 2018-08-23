import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Editor } from '@tinymce/tinymce-react';
import S3 from 'aws-sdk/clients/s3';
import { Rifm } from 'rifm';
import MaskedInput from 'react-text-mask'

import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

import FileUpload from '../forms/FileUpload.js';
import EditAvatarButton from '../header/EditAvatarButton.js'
// import UserFiles from '../../startup/collections/files';
import AddEventForm from '../forms/AddEventForm2';

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

    if (GoogleMaps.loaded()) {
      completeAddress = new google.maps.places.Autocomplete(
          /** @type {!HTMLInputElement} */
          document.getElementById('formatted_address'),{
            types: ['address'],
            componentRestrictions: {country:'US'}
          }
        );
    }

    return (
    
    <div>
    <p></p>
    <hr style={{width:"80%"}}/>
    <AddEventForm />
    <Input
    size="15"
    inputComponent={() => <MaskedInput
      mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholder="Enter a phone number"
      placeholderChar={`\u2000`}
      keepCharPositions={true}
      showMask={true}
      size={15}
      id="my-input-id"
      style={{border:'none'}}
     />} />
  
    <input id="formatted_address" type="address"/>

      </div>
    )
  }
};
    
export default PageTest;

