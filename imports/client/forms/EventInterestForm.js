import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { _ } from 'underscore';

import AutoFields  from 'uniforms-material/AutoFields';
import AutoForm    from 'uniforms-material/AutoForm';
import SubmitField from 'uniforms-material/SubmitField';
import TextField   from 'uniforms-material/TextField';
import ErrorsField from 'uniforms-material/ErrorsField';
import eventAppliedTemplate from '../email/eventAppliedTemplate'

import '../../startup/collections/schemas';

export default class EventInterestForm extends Component {

  render() {
    
    const user = this.props.user;
    const event = this.props.event;
    const userEmail = user.emails[0].address;
    
     const emailProps = [
      "noreply@pakke.us",
      "Thank You for Applying!",
      eventAppliedTemplate(user,event)
      ];

    const handleSubmit = function(doc) {
        Meteor.call('addInterests', doc);
    }; 

    const handleSuccess = () => {
        Bert.alert("Thank you for Applying!", "success");
        
        Meteor.call('amApplied', event._id);
        //AUTO-INVITE AFTER APPLYING TO EVENT SO THEY CAN BUY TICKET....
        Meteor.call('amInvited', event._id);
        //CAN ALSO COMMENT THIS OUT AND RUN:
        // Meteor.call('inviteGuests', eventId, emailArray)
        //BO INVITE MULTIPLE PEPLE AT ONCE.

        $('#eventInterestsModal').modal('toggle');
        Meteor.call('sendEmail', userEmail, ...emailProps);
    };

    const handleFailure = () => {
        Bert.alert("Sorry, Something Went Wrong", "danger", "growl-top-right");
    };

    const model = user.profile.interests || {};
    // const allKeys = Schema.Interests._schemaKeys;
    // const answeredKeys = Object.keys(model);
    // const fields = _.sample(_.difference(allKeys, answeredKeys), 3);
    
    //get fields with empty values
    //get sample of 3 fields

    

    return (
      <AutoForm  
      schema={Schema.Interests} 
      model={model} 
      onSubmit={handleSubmit} 
      onSubmitSuccess={handleSuccess} 
      onSubmitFailure={handleFailure} >

          <AutoFields />
          <SubmitField value="Submit"  />
          <ErrorsField />
      </AutoForm>
    );
  }
}
