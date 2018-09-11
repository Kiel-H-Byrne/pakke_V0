import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { _ } from 'underscore';

import analytics from '/lib/analytics/analytics.min.js';
import AutoFields  from 'uniforms-material/AutoFields';
import AutoForm    from 'uniforms-material/AutoForm';
import SubmitField from 'uniforms-material/SubmitField';
import TextField   from 'uniforms-material/TextField';
import ErrorsField from 'uniforms-material/ErrorsField';
import eventAppliedTemplate from '../email/eventAppliedTemplate';
import eventAppliedAdminTemplate from '../email/eventAppliedAdminTemplate';


import '../../startup/collections/schemas';

export default class EventInterestForm extends Component {

  render() {
    
    const user = this.props.user;
    const event = this.props.event;
    const userEmail = user.emails[0].address;
    
    const userEmailProps = [
      "Thank You for Applying!",
      eventAppliedTemplate(user,event)
    ];
    const adminEmailProps = [
      "EVENTS: APPLICATION RECEIVED",
      eventAppliedAdminTemplate(user,event)

    ]

    const handleSubmit = function(doc) {
        Meteor.call('addInterests', doc);
    }; 

    const handleSuccess = () => {
        Bert.alert("Thank you for Applying!", "success");
        
        Meteor.call('amApplied', event._id, user);
        //AUTO-INVITE AFTER APPLYING TO EVENT SO THEY CAN BUY TICKET....
        Meteor.call('amInvited', event._id, user);
        //CAN ALSO COMMENT THIS OUT AND RUN:
        // Meteor.call('inviteGuests', eventId, emailArray)
        //BO INVITE MULTIPLE PEPLE AT ONCE.

        //EAMIL TO VISITOR
        Meteor.call('sendEmail', userEmail, ...userEmailProps);
        //EMAIL TO HOST
        // Meteor.call('sendEmail', hostEmail, ...hostEmailProps);
        //EMAIL TO ADMIN
        Meteor.call('sendEmail', "info@pakke.us", ...adminEmailProps);
        analytics.track("Applied to event", {
          label: event._id,
          value: event.price
        })
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

    if (this.props.user.profile.interests && this.props.user.profile.interests.localBetter) {
      handleSuccess();
      return <div></div>
    }

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
