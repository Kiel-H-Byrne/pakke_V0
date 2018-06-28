import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import AutoField  from 'uniforms-material/AutoField';
import AutoForm    from 'uniforms-material/AutoForm';
import SubmitField from 'uniforms-material/SubmitField';
import ErrorsField from 'uniforms-material/ErrorsField';

import UploadField from './UploadField.js';
import EventImagesUpload from './EventImagesUpload.js'; 
import VenuesForm from './VenuesForm';
import AddVenueForm from './AddVenueForm.js'

import '../../startup/collections/schemas';

// This will render an automatic, validated form, with labelled fields, inline
// validation and a submit button. If model will be present, form will be filled
// with appropriate values.

const AddVenueModal = (props) => {
  return (
    <div className="modal fade" id="addVenueModal" role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal">&times;</button>
            <h4 className="modal-title">New Venue:</h4>
          </div>
          <div className="modal-body">
            <AddVenueForm />
          </div>
        </div>
      </div>
    </div>
  )
};

//ALLOWS FOR DEFAULT VALUES TO GET PULLED INTO FORM VALUES FOR VALIDATION/SUBMISSION. 
//WITHOUT THIS, AUTOVALUES/DEFAULTVALUES ARE EMPTY WHEN FORM IS SUBMITTED!!!
class AddEventForm extends Component {

    handleSubmit(doc) {
        Meteor.call('addEvent', doc);
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
        const omitFields = ["submitted", "venue", "hostId", "categories", "appliedList", "invitedList", "confirmedList", "entertainers", "venueId", "partner", "featured"];
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

                <AutoField name="byline" />
                <AutoField name="description" />
                <AutoField name="date" />
                <AutoField name="duration" />
                <AutoField name="size" />
                <AutoField name="price" />
                <VenuesForm />
                <AutoField name="contact" />
                {/*
                <EventImagesUpload name="image" />
                */}
                <SubmitField value="Submit"  />
                <ErrorsField />
            </AutoForm>
            <AddVenueModal />

        </div>
        );
    }
}
export default AddEventForm;