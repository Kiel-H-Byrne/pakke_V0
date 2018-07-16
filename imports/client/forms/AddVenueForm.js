import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AutoForm    from 'uniforms-material/AutoForm';
import SubmitField from 'uniforms-material/SubmitField';
import TextField   from 'uniforms-material/TextField';
import ErrorsField from 'uniforms-material/ErrorsField';
import AutoField  from 'uniforms-material/AutoField';
import HiddenField from 'uniforms-material/HiddenField'; 
import LongTextField from 'uniforms-material/LongTextField'; // Choose your theme package.
import InputLabel from '@material-ui/core/InputLabel';

import { BarLoader } from 'react-spinners';
import TinyInput from './TinyInput.js'
import ImagesUpload from './ImagesUpload.js'; 

import '../../startup/collections/schemas';

const styles = theme => ({

})
// This will render an automatic, validated form, with labelled fields, inline
// validation and a submit button. If model will be present, form will be filled
// with appropriate values.
class AddVenueForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(doc) {
      Meteor.call('addVenue', doc);
      this.props.handleClose();
  }; 

  handleSuccess() {
      Bert.alert("You have a new place!", "success");
  };

  handleFailure() {
      Bert.alert("Sorry, Something Went Wrong", "danger", "growl-top-right");
  };
  render() {
    const { classes } = this.props;

    const model = Schema.Venue.clean({});
    // console.log(model);
    //ALLOWS FOR DEFAULT VALUES TO GET PULLED INTO FORM VALUES FOR VALIDATION/SUBMISSION. 
    //WITHOUT THIS, AUTOVALUES/DEFAULTVALUES ARE EMPTY WHEN FORM IS SUBMITTED!!!
    return (
        // <AutoForm schema={Schema.Event} onSubmit={doc => handleSubmit(doc)} model={model} onSubmitSuccess={() => console.log('Promise resolved!')}
        // onSubmitFailure={() => console.log('Promise rejected!')}/>
      <AutoForm  
      schema={Schema.Venue} 
      onSubmit={this.handleSubmit} 
      model={model}
      onSubmitSuccess={this.handleSuccess} 
      onSubmitFailure={this.handleFailure} 
      >
      <HiddenField name="hostId" />
        <AutoField name="nickname" margin="dense" />
        <LongTextField name="description"/>
          <AutoField name="ownedStatus" margin="dense" />
          <AutoField name="venueType" margin="dense" />
          <AutoField name="capacity" margin="dense" />
          <AutoField name="address" margin="dense" />
          
          <ImagesUpload name="image" />
                
        <SubmitField>Submit</SubmitField>
        <ErrorsField />
      </AutoForm>
    );

  }
}
export default withStyles(styles)(AddVenueForm);
