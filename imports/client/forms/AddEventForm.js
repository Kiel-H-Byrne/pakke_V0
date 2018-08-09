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

import FileUpload from './FileUpload.js';
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
    
    handleSubmit = doc => {
        // console.log(doc)
        Meteor.call('addEvent', doc);
        this.props.handleClose();


        const adminEmailProps = [
          "noreply@pakke.us",
          "EVENTS: EVENT CREATED",
          eventCreatedAdminTemplate(Meteor.user(), doc)
        ];

        //send admin email
        if (Meteor.isProduction) {
            Meteor.call('sendEmail', "kiel@pakke.us", ...adminEmailProps);
            let crmParams = {
              "Event Owner": Meteor.user().username,
              "Subject": doc.byline ,
              "Start DateTime" : doc.date,
              "End DateTime": doc.date + duration
            };
            Meteor.call('crmInsert', 'event', crmParams);
        } else {
            console.log (doc)
        }
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
                <h3>Step 1. - Locate It</h3>
                <p>Add a Place for your PAKKE, and use it later!</p>
                <VenuesForm form="addeventForm"/>
                <hr width="66%"/>
                <h3>Step 2. - Describe It</h3>
                <p>Let guests know what this experience is about!</p>
                <AutoField name="byline" />
                <InputLabel htmlFor="event-description" shrink={true}>Describe this experience...</InputLabel>
                <TinyInput name="description"/>
                <DateField name="date"  />
                <AutoField name="duration"  />
                <AutoField name="size" />
                <AutoField name="price" />
                <hr width="66%"/>

                <AutoField name="isPrivate" />
                <AutoField name="contact" />
                
                {/* <MaskedInput 
                    mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                    name="contact"
                    label="Contact Number"

                /> */}
                <p>Upload a picture to use for the cover!</p>
                <FileUpload name="image" module="events"/>
                <AutoField name="checkedPolicy" />
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