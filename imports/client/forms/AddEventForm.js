import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Editor } from '@tinymce/tinymce-react';

import connectField from 'uniforms/connectField';
import AutoForm    from 'uniforms-material/AutoForm';
import AutoFields  from 'uniforms-material/AutoFields';
import AutoField  from 'uniforms-material/AutoField';
import SubmitField from 'uniforms-material/SubmitField';
import ErrorsField from 'uniforms-material/ErrorsField';

import UploadField from './UploadField.js';
import EventImagesUpload from './EventImagesUpload.js'; 
import VenuesForm from './VenuesForm';
import AddVenueForm from './AddVenueForm.js'
import eventCreatedAdminTemplate from '../email/eventCreatedAdminTemplate';
import '../../startup/collections/schemas';

// This will render an automatic, validated form, with labelled fields, inline
// validation and a submit button. If model will be present, form will be filled
// with appropriate values.


//ALLOWS FOR DEFAULT VALUES TO GET PULLED INTO FORM VALUES FOR VALIDATION/SUBMISSION. 
//WITHOUT THIS, AUTOVALUES/DEFAULTVALUES ARE EMPTY WHEN FORM IS SUBMITTED!!!



class EditorComponent extends Component {
    handleEditorChange = (e) => {
    console.log('Content was updated:', e.target.getContent());
    console.log(e);
    }
    render() {
        return (
            <Editor
                apiKey={Meteor.settings.public.keys.tinymce.key}
                initialValue="Describe this experience..."
                init={{
                  selector: "textarea",
                  plugins: 'link',
                  toolbar: 'undo redo | bold italic | bullist numlist | link  ',
                  menubar: false,
                  statusbar: false,
                  resize: false,
                  branding: false
                }}
                onChange={this.handleEditorChange}
                style={{width:'100%'}}
              />
        )
    }
}

const EditorField = connectField(EditorComponent, {
    ensureValue: false,
    includeInChain: false,
    initialValue: false
});

class AddEventForm extends Component {

    handleSubmit(doc) {
        console.log(doc)
        // Meteor.call('addEvent', doc);

        const adminEmailProps = [
          "noreply@pakke.us",
          "EVENTS: EVENT CREATED",
          eventCreatedAdminTemplate(this.props.user,doc)
        ];

        //send admin email
        Meteor.call('sendEmail', "kiel@pakke.us", ...adminEmailProps);
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
          $('#hostProfileModal').modal('toggle');
    };

    handleFailure() {
        Bert.alert("Sorry, Something Went Wrong", "danger", "growl-top-right");
    };
    
    render() {
        const model = Schema.Event.clean({});
        // console.log(model);
        const omitFields = ["submitted", "venue", "hostId", "categories", "appliedList", "invitedList", "confirmedList", "entertainers", "partner", "featured"];
        const shownFields = [""]

        return (
            // <AutoForm schema={Schema.Event} onSubmit={doc => handleSubmit(doc)} model={model} onSubmitSuccess={() => console.log('Promise resolved!')}
            // onSubmitFailure={() => console.log('Promise rejected!')}/>
        <div>
            <AutoForm  
            schema={Schema.Event} 
            model={model} 
            onSubmit={this.handleSubmit} 
            onSubmitSuccess={this.handleSuccess} 
            onSubmitFailure={this.handleFailure} >

                <AutoField name="byline" margin="dense"/>
                <AutoField component={ EditorField } name="description" margin="dense" />
                <AutoField name="date" margin="dense" />
                <AutoField name="eventAddress.street" margin="none" />
                <AutoField name="eventAddress.place" margin="none" />
                <AutoField name="eventAddress.city" margin="none" />
                <AutoField name="eventAddress.state" margin="none" />
                <AutoField name="eventAddress.zip" margin="none" />
                <AutoField name="duration" margin="dense" />
                <AutoField name="size" margin="dense" />
                <AutoField name="price" margin="dense" />
{/*
                <AutoField name="venueId" margin="dense" />
                <VenuesForm />
                <AutoField name="contact" margin="dense" />
                */}
                {/*
                <EventImagesUpload name="image" />
                */}
                <SubmitField value="Submit" />
                <ErrorsField />
            </AutoForm>

        </div>
        );
    }
}
export default AddEventForm;