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
    Meteor.call('addEvent', doc);
    // let crmParams = {
    //   "Event Owner": Meteor.user().username,
    //   "Subject": doc.byline ,
    //   "Start DateTime" : doc.date: 
    //   "End DateTime": doc.date + duration
    // };
    // Meteor.call('crmInsert', 'event', crmParams);
}; 

const handleSuccess = () => {
    Bert.alert("Your Event Was Posted!", "success");
};

const handleFailure = () => {
    Bert.alert("Sorry, Something Went Wrong", "danger", "growl-top-right");
};

const omitFields = ["submitted","guests", "guestCount", "hostId", "venueId", "eventAddress.address", "eventAddress.coords"];


const model = Schema.Event.clean({});
//ALLOWS FOR DEFAULT VALUES TO GET PULLED INTO FORM VALUES FOR VALIDATION/SUBMISSION. 
//WITHOUT THIS, AUTOVALUES/DEFAULTVALUES ARE EMPTY WHEN FORM IS SUBMITTED!!!

const EventForm = () =>(
    // <AutoForm schema={Schema.Event} onSubmit={doc => handleSubmit(doc)} model={model} onSubmitSuccess={() => console.log('Promise resolved!')}
    // onSubmitFailure={() => console.log('Promise rejected!')}/>
<AutoForm  
schema={Schema.Event} 
model={model} 
onSubmit={handleSubmit} 
onSubmitSuccess={handleSuccess} 
onSubmitFailure={handleFailure} >

    <AutoFields omitFields={omitFields} />
    <SubmitField value="Submit"  />
    <ErrorsField />
</AutoForm>
);

export default EventForm;