import React, { Component } from 'react';
import AutoFields   from 'uniforms-bootstrap3/AutoFields';
import AutoForm    from 'uniforms-bootstrap3/AutoForm';
import SubmitField from 'uniforms-bootstrap3/SubmitField';
import TextField   from 'uniforms-bootstrap3/TextField';
import ErrorsField from 'uniforms-bootstrap3/ErrorsField';

import '../../startup/collections/schemas';

// This will render an automatic, validated form, with labelled fields, inline
// validation and a submit button. If model will be present, form will be filled
// with appropriate values.

const handleSubmit = function(doc) {
	const uid = Meteor.userId();
	
	if (! Roles.userIsInRole(Meteor.userId(), 'Host')) {
		Meteor.call('addRole', uid, "host");
	}
	Meteor.call('addEvent', doc);

	// Meteor.users.update(uid, {
	//     $set: {"profile[type]": doc}
	//   })


}; 
const omitFields = ["creator", "submitted", "retired", "guests", "guestCount", "attended", "host", "eventAddress.address", "eventAddress.coords"];

const EventForm = ({model}) =>(
    // <AutoForm schema={Schema.Event} onSubmit={doc => handleSubmit(doc)} model={model} onSubmitSuccess={() => console.log('Promise resolved!')}
    // onSubmitFailure={() => console.log('Promise rejected!')}/>
<AutoForm  schema={Schema.Event} >
    <AutoFields omitFields={omitFields} />
    <SubmitField value="Submit" />
    <ErrorsField />
</AutoForm>
);

export default EventForm;