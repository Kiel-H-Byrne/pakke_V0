import React from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';

class PaymentRequestForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    // For full documentation of the available paymentRequest options, see:
    // https://stripe.com/docs/stripe.js#the-payment-request-object
    const paymentRequest = props.stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        label: 'Demo total',
        amount: 1000,
      },
    });

    paymentRequest.on('token', ({complete, token, ...data}) => {
      console.log('Received Stripe token: ', token);
      console.log('Received customer information: ', data);
      complete('success');
    });

    paymentRequest.canMakePayment().then(result => {
      this.setState({canMakePayment: !!result});
    });

    this.state = {
      canMakePayment: false,
      paymentRequest,
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    this.props.stripe.createToken({name: 'Souper Youzer'}).then(({error, token}) => {
      if (error) {
        Bert.alert(error.message, "danger", "growl-top-right");
      } else {
        console.log('Received Stripe token:', token);
        Meteor.call('createCharge', this.props.event.price, this.props.event.byline, token, (error) => {
          console.log(error);
        });
        //3796 330728 93002 6/18 9534 20031
        // Bert.alert("Payment Successful" "danger", "growl-top-right");
      }
    });

    // However, this line of code will do the same thing:
    // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});
      // add to events.guests.confirmed(userId)
      // Meteor.call('amConfirmed', eventId, user._id);
      
      // Meteor.call('sendEmail', userEmail, ...emailProps);
  }; 
  

  render() {
    return this.state.canMakePayment ? (
      <PaymentRequestButtonElement
        paymentRequest={this.state.paymentRequest}
        className="PaymentRequestButton"
        style={{
          // For more details on how to style the Payment Request Button, see:
          // https://stripe.com/docs/elements/payment-request-button#styling-the-element
          paymentRequestButton: {
            theme: 'light',
            height: '64px',
          },
        }}
      />
    ) : (
      <form id="payment-form" onSubmit={this.handleSubmit}>
        <div className="form-row">
          <label htmlFor="card-element">Credit or debit card</label>
          <div id="card-element">
            <CardElement style={{base: {fontSize: '20px'}}} />
          </div>
          <div id="card-errors" role="alert"></div>
        </div>
        <button className="btn btn-success btn-lg">Submit Payment</button>
      </form> 
    );
  }
}
export default injectStripe(PaymentRequestForm);
