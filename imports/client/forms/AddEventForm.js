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

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';

import '../../startup/collections/schemas';
import eventCreatedAdminTemplate from '../email/eventCreatedAdminTemplate';
import FileUpload from './FileUpload.js';
import VenuesForm from './VenuesForm';
import TinyInput from './TinyInput.js'


// This will render an automatic, validated form, with labelled fields, inline
// validation and a submit button. If model will be present, form will be filled
// with appropriate values.


//ALLOWS FOR DEFAULT VALUES TO GET PULLED INTO FORM VALUES FOR VALIDATION/SUBMISSION. 
//WITHOUT THIS, AUTOVALUES/DEFAULTVALUES ARE EMPTY WHEN FORM IS SUBMITTED!!!


class AddEventForm extends Component {
    
    handleSubmit = doc => {
        // console.log(doc)
        Meteor.call('addEvent', doc);
        // this.props.handleClose();
        //REDIRECT TO PROFILE/HOSTING PAGE (OR EVENTS PAGE)
        //ADD URL TO /PROFILE TO CATCH WHICH TAB I WANT TO NAVIGATE TO


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

    handleSuccess = () => {
        Bert.alert("Your Event Was Posted!", "success");
        window.location.href="https://www.pakke.us/?eventAdded"
        console.log(this.props)
        // this.props.history.push('/?eventAdded');

        //redirect; to home
    };

    handleFailure() {
        Bert.alert("Sorry, Something Went Wrong", "danger", "growl-top-right");
    };
    
    render() {
        const model = Schema.Event.clean({});
        // console.log(model)
    
        return (
            <Grid container alignItems="center" direction="column" style={{margin: "1rem"}}>
                <Grid item >
                    <AutoForm  
                    schema={Schema.Event} 
                    model={model} 
                    onSubmit={this.handleSubmit} 
                    onSubmitSuccess={this.handleSuccess} 
                    onSubmitFailure={this.handleFailure} 
                    className="tinyForm"
                    id="addeventForm"
                    >   
                        <div>
                        <Typography variant="display1" align="center">Step 1. - Locate It</Typography>
                        <VenuesForm form="addeventForm"/>
                        </div>
                        
                        <div >
                        <Typography variant="display1" align="center">Step 2. - Describe It</Typography>
                        <Typography variant="subheading" align="center">Let guests know what this experience is about!</Typography>
                        <AutoField name="byline" />
                        <InputLabel htmlFor="event-description" shrink={true}>Describe this experience...</InputLabel>
                        <TinyInput name="description"/>
                        <DateField name="date"  />
                        <AutoField name="duration"  />
                        <AutoField name="size" />
                        <AutoField name="price" />
                        <InputLabel>Upload a picture to use for the cover!</InputLabel>
                        <FileUpload name="image" module="events"/>
                        </div>
                        
                        <div >
                        <Typography variant="display1" align="center">Step 3. - Publish It</Typography>
                        <AutoField name="isPrivate" />
                        <AutoField name="contact" />
                        
                        {/* <MaskedInput 
                            mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                            name="contact"
                            label="Contact Number"

                        /> */}
                        <AutoField name="checkedPolicy" />
                        <Typography 
                        component={Link}
                        to="/terms"
                        variant="caption"
                        align="right"
                        >Peruse the PAKKE Privacy Policy
                        </Typography>
                        <HiddenField name="hostId" />                
                        </div>
                        <SubmitField>Submit</SubmitField>
                        <ErrorsField />
                    </AutoForm>
                </Grid>
            </Grid>
        );
    }
}
export default AddEventForm;