import React, { Component } from 'react';
import AutoFields  from 'uniforms-bootstrap3/AutoFields';
import AutoForm    from 'uniforms-bootstrap3/AutoForm';
import SubmitField from 'uniforms-bootstrap3/SubmitField';
import TextField   from 'uniforms-bootstrap3/TextField';
import ErrorsField from 'uniforms-bootstrap3/ErrorsField';

import '../../startup/collections/schemas';

// This will render an automatic, validated form, with labelled fields, inline
// validation and a submit button. If model will be present, form will be filled
// with appropriate values.
class AddVenueForm extends Component {
  constructor(props) {
    super(props);
    this.formRef = null;
  }


  handleSubmit(doc) {
      Meteor.call('addVenue', doc);
  }; 

  handleSuccess() {
      Bert.alert("Your Profile Was Updated!", "success");
      $('#hostProfileModal').modal('toggle');

  };

  handleFailure() {
      Bert.alert("Sorry, Something Went Wrong", "danger", "growl-top-right");
  };
  render() {
    const model = Schema.Venue.clean({});
    //ALLOWS FOR DEFAULT VALUES TO GET PULLED INTO FORM VALUES FOR VALIDATION/SUBMISSION. 
    //WITHOUT THIS, AUTOVALUES/DEFAULTVALUES ARE EMPTY WHEN FORM IS SUBMITTED!!!
    return (
        // <AutoForm schema={Schema.Event} onSubmit={doc => handleSubmit(doc)} model={model} onSubmitSuccess={() => console.log('Promise resolved!')}
        // onSubmitFailure={() => console.log('Promise rejected!')}/>
      <AutoForm  
      validate="onChangeAfterSubmit"
      schema={Schema.Venue} 
      model={model} 
      onSubmit={this.handleSubmit} 
      onSubmitSuccess={this.handleSuccess} 
      onSubmitFailure={this.handleFailure} >

          <AutoFields  />
          <SubmitField value="Submit"  />
          <ErrorsField />
      </AutoForm>
    );

  }
}
export default AddVenueForm;
