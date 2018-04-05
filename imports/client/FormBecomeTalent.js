import React from 'react';
import AutoField from 'uniforms-unstyled/AutoField';
import AutoForm from 'uniforms-unstyled/AutoForm';
import SubmitField from 'uniforms-unstyled/SubmitField';
import TextField from 'uniforms-unstyled/TextField';
import '../startup/collections/schemas';

const FormBecomeTalent = ({ model }) =>
    <AutoForm schema={Schema.asTalent} onSubmit={doc => db.save(doc)} model={model}>
        
    </AutoForm>
    ;

export default FormBecomeTalent;