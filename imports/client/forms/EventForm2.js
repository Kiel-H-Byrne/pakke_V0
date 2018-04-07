import React, { Component } from 'react';
import AutoForm from 'uniforms-bootstrap3/AutoForm';

// Choose your theme
// import 'imports/startup/collections/schemas';


// A compatible schema

// This will render an automatic, validated form, with labelled fields, inline
// validation and a submit button. If model will be present, form will be filled
// with appropriate values.

const EventForm = ({model}) =>
    <AutoForm schema={Schema.Event} onSubmit={doc => db.save(doc)} model={model} />
;

export default EventForm;