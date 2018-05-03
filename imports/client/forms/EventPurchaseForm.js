import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import AutoFields  from 'uniforms-bootstrap3/AutoFields';
import AutoForm    from 'uniforms-bootstrap3/AutoForm';
import SubmitField from 'uniforms-bootstrap3/SubmitField';
import TextField   from 'uniforms-bootstrap3/TextField';
import ErrorsField from 'uniforms-bootstrap3/ErrorsField';
import { CardElement, Elements, injectStripe } from 'react-stripe-elements';

import '../../startup/collections/schemas';
import eventPurchasedTemplate from '../email/eventPurchasedTemplate'


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
    const handleSubmit = function(e, doc) {
        e.preventDefault();

            // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
      console.log(this.props.stripe);

      this.props.stripe.createToken({name: 'Jenny Rosen'}).then(({token}) => {
        console.log('Received Stripe token:', token);
      });

    // However, this line of code will do the same thing:
    // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});



        console.log(this, e.);
        // add to events.guests.applied(userId)
        // Meteor.call('amConfirmed', eventId, user._id);
        $('#eventPurchaseModal').modal('toggle');
        Meteor.call('sendEmail', userEmail, ...emailProps);
    }; 

    const handleSuccess = () => {
        Bert.alert("Thank you for Applying!", "success");
                $('#eventPurchaseModal').modal('toggle');

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
            <div>

      <div className="eventDetails">
        <div className="card" style={{"width": "100%","border": "1px solid grey", "border-radius": ".5rem"}}>
          <img className="card-img-top" src={event.image} style={{"width": "inherit"}} alt={event.byline} />
          <div className="card-body">
            <h3 className="card-title">{event.byline}</h3>
            <p className="card-text">{event.description}</p>
            <h4>${event.price}.00</h4>    
          </div>
        </div>
      </div>
      <Elements>
        <form id="payment-form" onSubmit={this.handleSubmit}>
          <div className="form-row">
            <label htmlFor="card-element">Credit or debit card</label>
            <div id="card-element">
            <AddressSection />
        <CardSection />
        <button>Confirm order</button>
              <CardElement style={{base: {fontSize: '20px'}}} />
            </div>
            <div id="card-errors" role="alert"></div>
          </div>

          <button className="btn btn-success btn-lg">Submit Payment</button>
        </form>
      </Elements>
      </div>
    );
  }
}



export default injectStripe(EventPurchaseForm);
