import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import AutoFields  from 'uniforms-bootstrap3/AutoFields';
import AutoForm    from 'uniforms-bootstrap3/AutoForm';
import SubmitField from 'uniforms-bootstrap3/SubmitField';
import TextField   from 'uniforms-bootstrap3/TextField';
import ErrorsField from 'uniforms-bootstrap3/ErrorsField';
import eventPurchasedTemplate from '../email/eventPurchasedTemplate'

import '../../startup/collections/schemas';

const emailProps = [
  "noreply@pakke.us",
  "Thank You for Applying!",
  eventPurchasedTemplate
  ];

export default class EventPurchaseForm extends Component {
  render() {
    console.log(this);

    const user = this.props.user;
    const userEmail = user.emails[0].address;
    const eventId = this.props.eventId;
    const handleSubmit = function(doc) {
      
        
        // add to events.guests.applied(userId)
        Meteor.call('amConfirmed', eventId, user._id);
        $('#eventPurchaseModal').modal('toggle');
        Meteor.call('sendEmail', userEmail, ...emailProps);
    }; 

    const handleSuccess = () => {
        Bert.alert("Thank you for Applying!", "success");
    };

    const handleFailure = () => {
        Bert.alert("Sorry, Something Went Wrong", "danger", "growl-top-right");
    };

    const model = user.profile.interests || {};
    const allKeys = Schema.Interests._schemaKeys;
    const answeredKeys = Object.keys(model);
    const fields = _.sample(_.difference(allKeys, answeredKeys), 3);
    
    //get fields with empty values
    //get sample of 3 fields

    return (
      <div>Something</div>
    );
  }
}


