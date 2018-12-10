import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Editor } from '@tinymce/tinymce-react';
import { Link } from 'react-router-dom';
import MaskedInput from 'react-text-mask'

import AutoForm    from 'uniforms-material/AutoForm';
import AutoField  from 'uniforms-material/AutoField';
import DateField  from 'uniforms-material/DateField';
import NumField  from 'uniforms-material/NumField';
import SubmitField from 'uniforms-material/SubmitField';
import ErrorsField from 'uniforms-material/ErrorsField';
import LongTextField from 'uniforms-material/LongTextField'; // Choose your theme package.

import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import HiddenField from 'uniforms-material/HiddenField'; 

import '../../startup/collections/schemas';
import eventCreatedAdminTemplate from '../email/eventCreatedAdminTemplate';
import eventCreatedHostTemplate from '../email/eventCreatedHostTemplate';
import DateTime from '../DateTime.js'
import PageError from '../PageError';

import FileUpload from './FileUpload.js';
import VenuesForm from './VenuesForm';
import TinyInput from './TinyInput.js'




// This will render an automatic, validated form, with labelled fields, inline
// validation and a submit button. If model will be present, form will be filled
// with appropriate values.


//ALLOWS FOR DEFAULT VALUES TO GET PULLED INTO FORM VALUES FOR VALIDATION/SUBMISSION. 
//WITHOUT THIS, AUTOVALUES/DEFAULTVALUES ARE EMPTY WHEN FORM IS SUBMITTED!!!

class AddEventForm extends Component {
    state = {mask: ''}
    handleSubmit = doc => {
        // console.log(doc)
        Meteor.call('addEvent', doc);
        // this.props.handleClose();
        //REDIRECT TO PROFILE/HOSTING PAGE (OR EVENTS PAGE)
        //ADD URL TO /PROFILE TO CATCH WHICH TAB I WANT TO NAVIGATE TO

        const adminEmailProps = [
          `{\u0394 EVENT CREATED: ${doc.byline} \u0394}`,
          eventCreatedAdminTemplate(Meteor.user(), doc)
        ];
        
        const hostEmailProps = [
          "Your new PAKKE Experience has been created!",
          eventCreatedHostTemplate(Meteor.user(), doc)
        ];

        //send admin email
        Meteor.call('sendEmail', Meteor.user().emails[0].address, ...hostEmailProps);
        if (Meteor.isProduction) {
            // Meteor.call('sendEmail', Meteor.user().emails[0].address, ...hostEmailProps);
            Meteor.call('sendEmail', "info@pakke.us", ...adminEmailProps);
            let crmParams = {
              "Event Owner": Meteor.user().username,
              "Subject": doc.byline ,
              "Start DateTime" : doc.date,
              "End DateTime": doc.date + doc.duration
            };
            Meteor.call('crmInsert', 'event', crmParams);
        } else {
            console.log (doc)
        }
    }; 

    handleSuccess = () => {
        //redirect; to home
        window.location.href="/?eventAdded"
        Bert.alert("Your Event Was Posted!", "pk-success", "fixed-bottom", "fa-thumbs-up");
        // this.props.history.push('/?eventAdded');
    };

    handleFailure() {
        Bert.alert("Sorry, Something Went Wrong", "danger", "growl-top-right", "fa-frown-open");
    };
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
    }
    render() {
        const model = Schema.Event.clean({});
        // console.log(model)
        
        if (!Meteor.userId()) {
          return (<PageError />)
        }
        return (
            <Grid container alignItems="center" direction="column" style={{width:"inherit", margin: ".5rem"}}>
                <Grid item xs={12}>
                    <AutoForm  
                    schema={Schema.Event} 
                    model={model} 
                    onSubmit={this.handleSubmit} 
                    onSubmitSuccess={this.handleSuccess} 
                    onSubmitFailure={this.handleFailure} 
                    className="tinyForm"
                    id="addeventForm"
                    autoComplete="off"
                    style={styles.form}
                    >   
                        <div>
                            <Typography variant="display1" align="center">Step 1. - Locate It</Typography>
                            <VenuesForm form="addeventForm"/>
                          </div>
                            
                          <div >
                            <Typography variant="display1" align="center">Step 2. - Describe It</Typography>
                            <Typography variant="subheading" align="center">Let guests know what this experience is about!</Typography>
                            <AutoField name="byline" />
                            <div><DateTime/></div>
                            <InputLabel htmlFor="event-description" shrink={true}>Describe this experience...</InputLabel>
                            <TinyInput name="description" id="event-description"/>
                            <AutoField name="duration"  />
                            <AutoField name="size" />
                            <NumField name="price" decimal={false} max={500} min={0}/>
                            <InputLabel>Upload a picture to use for the cover!</InputLabel>
                            <FileUpload name="image" module="events"/>
                          </div>
                            
                          <div >
                            <Typography variant="display1" align="center">Step 3. - Publish It</Typography>
                            {/*
                            <InputLabel>Contact Number:</InputLabel>
                            <Input
                              // size="15"
                              name="contact"
                              required={true}
                              type="text"
                              inputComponent={() => <MaskedInput
                                mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                placeholder="Enter a phone number"
                                placeholderChar={`\u2000`}
                                keepCharPositions={false}
                                showMask={true}
                                size={15}
                                id="my-input-id"
                                style={{border:'none'}}
                               />} 
                            />
                            
                            <MaskedInput
                                mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                placeholder="Enter a phone number"
                                placeholderChar={`\u2000`}
                                keepCharPositions={false}
                                showMask={true}
                                size={15}
                                id="my-input-id"
                                type="tel"
                                render={(ref, props) => (
                                  <AutoField name="contact" innerRef={ref} />
                                )}
                               />
                            */}
                            <AutoField name="contact" type="tel" />
                            <AutoField name="isPrivate" />
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