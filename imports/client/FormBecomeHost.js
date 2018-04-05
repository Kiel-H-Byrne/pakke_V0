import React from 'react';
import AutoForm from 'uniforms-bootstrap3/AutoForm';
// import BookSchema from '../startup/collections/schemas';
import '../startup/collections/schemas';

const FormBecomeHost = ({model}) =>
    <AutoForm schema={Schema.User} onSubmit={doc => db.save(doc)} model={model} />
;

export default FormBecomeHost;