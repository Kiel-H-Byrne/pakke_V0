import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import AutoFields  from 'uniforms-bootstrap3/AutoFields';
import AutoForm    from 'uniforms-bootstrap3/AutoForm';
import SubmitField from 'uniforms-bootstrap3/SubmitField';
import TextField   from 'uniforms-bootstrap3/TextField';
import ErrorsField from 'uniforms-bootstrap3/ErrorsField';

import '../../startup/collections/schemas';

// This will render an automatic, validated form, with labelled fields, inline
// validation and a submit button. If model will be present, form will be filled
// with appropriate values.

const handleSubmit = function(doc) {
    Meteor.call('addInterests', doc);
}; 

const handleSuccess = () => {
    Bert.alert("Thank you for Applying!", "success");
};

const handleFailure = () => {
    Bert.alert("Sorry, Something Went Wrong", "danger", "growl-top-right");
};

// const omitFields = ["submitted","guests", "guestCount", "hostId", "venueId", "eventAddress.address", "eventAddress.coords"];

const model = {} || Meteor.user().profile.interests;

export default class EventInterestForm extends Component {
  render() {
    return (
      <AutoForm  
      schema={Schema.Interests} 
      model={model} 
      onSubmit={handleSubmit} 
      onSubmitSuccess={handleSuccess} 
      onSubmitFailure={handleFailure} >

          <AutoFields  />
          <SubmitField value="Submit"  />
          <ErrorsField />
      </AutoForm>
    );
  }
}
