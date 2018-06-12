import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import AutoFields  from 'uniforms-material/AutoFields';
import AutoForm    from 'uniforms-material/AutoForm';
import SubmitField from 'uniforms-material/SubmitField';
import TextField   from 'uniforms-material/TextField';
import ErrorsField from 'uniforms-material/ErrorsField';
import { StripeProvider, Elements } from 'react-stripe-elements';

import '../../startup/collections/schemas';
import eventPurchasedTemplate from '../email/eventPurchasedTemplate'
import PaymentRequestForm from './PaymentRequestForm'


const emailProps = [
  "noreply@pakke.us",
  "Thank You for Applying!",
  eventPurchasedTemplate
  ];

class EventPurchaseForm extends Component {
  render() {
    // console.log(this);

    const user = this.props.user;
    const userEmail = user.emails[0].address;
    const event = this.props.event;

    return (
      <div>
        <div className="eventDetails">
          <div className="card" style={{"width": "100%", "borderRadius": ".5rem"}}>
            <div className="card-body">
              <h3 className="card-title">"{event.byline}"</h3>
              <p className="card-text"><em>{event.description}</em></p>
              <StripeProvider apiKey={ Meteor.settings.public.keys.stripe.key }>
                <Elements>
                  <PaymentRequestForm event = {event} user = {user} />
                </Elements>
              </StripeProvider>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EventPurchaseForm;
