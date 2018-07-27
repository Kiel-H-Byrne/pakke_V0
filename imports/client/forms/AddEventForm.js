import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Editor } from '@tinymce/tinymce-react';
import { Link } from 'react-router-dom';
import MaskedInput from 'react-text-mask'

import AutoForm    from 'uniforms-material/AutoForm';
import AutoField  from 'uniforms-material/AutoField';
import DateField  from 'uniforms-material/DateField';
import SubmitField from 'uniforms-material/SubmitField';
import ErrorsField from 'uniforms-material/ErrorsField';
import HiddenField from 'uniforms-material/HiddenField'; 
import LongTextField from 'uniforms-material/LongTextField'; // Choose your theme package.
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';

import UploadField from './UploadField.js';
import EventImagesUpload from './EventImagesUpload.js'; 
import VenuesForm from './VenuesForm';
import AddVenueForm from './AddVenueForm.js'
import TinyInput from './TinyInput.js'
import eventCreatedAdminTemplate from '../email/eventCreatedAdminTemplate';
import '../../startup/collections/schemas';

// This will render an automatic, validated form, with labelled fields, inline
// validation and a submit button. If model will be present, form will be filled
// with appropriate values.


//ALLOWS FOR DEFAULT VALUES TO GET PULLED INTO FORM VALUES FOR VALIDATION/SUBMISSION. 
//WITHOUT THIS, AUTOVALUES/DEFAULTVALUES ARE EMPTY WHEN FORM IS SUBMITTED!!!


class AddEventForm extends Component {
    
    handleSubmit(doc) {
        console.log(doc)
        // Meteor.call('addEvent', doc);

        // const adminEmailProps = [
        //   "noreply@pakke.us",
        //   "EVENTS: EVENT CREATED",
        //   eventCreatedAdminTemplate(this.props.user,doc)
        // ];

        //send admin email

        // Meteor.call('sendEmail', "kiel@pakke.us", ...adminEmailProps);
        // let crmParams = {
        //   "Event Owner": Meteor.user().username,
        //   "Subject": doc.byline ,
        //   "Start DateTime" : doc.date: 
        //   "End DateTime": doc.date + duration
        // };
        // Meteor.call('crmInsert', 'event', crmParams);
    }; 

    handleSuccess(){
        Bert.alert("Your Event Was Posted!", "success");
    };

    handleFailure() {
        Bert.alert("Sorry, Something Went Wrong", "danger", "growl-top-right");
    };
    
    render() {
        const model = Schema.Event.clean({});
        // console.log(model)
    
        return (
            <AutoForm  
            schema={Schema.Event} 
            model={model} 
            onSubmit={this.handleSubmit} 
            onSubmitSuccess={this.handleSuccess} 
            onSubmitFailure={this.handleFailure} 
            className="tinyForm"
            id="addeventForm"
            >
                <VenuesForm form="addeventForm"/>
                <AutoField name="byline" margin="dense"/>
                <InputLabel htmlFor="event-description" shrink={true}>Describe this experience...</InputLabel>
                <TinyInput name="description"/>
                <DateField name="date" margin="dense" />
                <AutoField name="duration" margin="dense" />
                <AutoField name="size" margin="dense" />
                <AutoField name="price" margin="dense" />
                <AutoField name="isPrivate" margin="dense" />
                <AutoField name="contact" margin="dense" />
                {/* <MaskedInput 
                    mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                    name="contact"
                    label="Contact Number"

                /> */}
                <EventImagesUpload name="image" />
                <AutoField name="checkedPolicy" margin="dense" />
                <Typography 
                component={Link}
                to="/terms"
                variant="caption"
                align="right"
                >Peruse the PAKKE Privacy Policy
                </Typography>
                <HiddenField name="hostId" />                
                <SubmitField>Submit</SubmitField>
                <ErrorsField />
            </AutoForm>
        );
    }
}
export default AddEventForm;