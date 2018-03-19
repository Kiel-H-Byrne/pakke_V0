import React, { Component } from 'react';
// Choose your theme
import AutoForm from 'uniforms-bootstrap4/AutoForm';

// A compatible schema
import '../startup/collections/schemas';

// This will render an automatic, validated form, with labelled fields, inline
// validation and a submit button. If model will be present, form will be filled
// with appropriate values.

const EventForm = ({model}) =>
    <AutoForm schema={Schema.Event} onSubmit={doc => db.save(doc)} model={model} />
;

export default EventForm;