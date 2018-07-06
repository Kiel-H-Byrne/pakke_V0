import React from 'react';
import { CardElement, injectStripe, PaymentRequestButtonElement } from 'react-stripe-elements';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import eventPurchasedTemplate from '../email/eventPurchasedTemplate';
import eventPurchasedAdminTemplate from '../email/eventPurchasedAdminTemplate';

class PaymentRequestForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    // For full documentation of the available paymentRequest options, see:
    // https://stripe.com/docs/stripe.js#the-payment-request-object
    const stripeTokenHandler = function(token) {
      // Insert the token ID into the form so it gets submitted to the server
      let form = document.getElementById('payment-form');
      let hiddenInput = document.createElement('input');
      hiddenInput.setAttribute('type', 'hidden');
      hiddenInput.setAttribute('name', 'stripeToken');
      hiddenInput.setAttribute('value', token.id);
      form.appendChild(hiddenInput);
      // Submit the form
      //add user phone and real name if not already there.
      form.submit();
    }

    const paymentRequest = props.stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        label: `PAKKE EVENT: ${this.props.event._id}`,
        amount: this.props.event.price * 100,
      },
      requestPayerName: true,
      requestPayerEmail: true,
    });

    paymentRequest.on('token', ({complete, token, ...data}) => {
      console.log('Received Stripe token: ', token);
      console.log('Received customer information: ', data);
      stripeTokenHandler(token);
      complete('success');
    });
    //PaymentRequestButtonElement NOT WORKING (just times out), SO COMMENTED OUT 
    // Timed out waiting for a PaymentResponse.complete() call.
    //SETS VARIABLE TO TRUE IF IT CAN, (I DON'T WANT IT TO)
    // paymentRequest.canMakePayment().then(result => {
    //   this.setState({canMakePayment: !!result});
    // });
    
    this.state = {
      canMakePayment: false,
      paymentRequest,
    };
  }

  handleSubmit(e) {
    console.log('submitting...');
    e.preventDefault();
    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    const user = this.props.user;
          // console.log(user)
    const userEmail = user.emails[0].address;
    const userEmailProps = [
      "noreply@pakke.us",
      "Ticket Purchase Confirmation",
      eventPurchasedTemplate(user,this.props.event)
    ];
    
    const adminEmailProps = [
      "noreply@pakke.us",
      "EVENTS: Ticket Purchase",
      eventPurchasedAdminTemplate(user,this.props.event)
    ];


    this.props.stripe.createToken({'name': this.props.user.profile.name}).then(({error, token}) => {
      if (error) {
        Bert.alert(error.message, "danger", "growl-top-right");
      } else {
        let handleClose = this.props.handleClose
        let event = this.props.event
        // console.log('Payment Received token:', token);
        Meteor.call('createCharge', this.props.event.price, this.props.event.byline, token, function(error, result) {
          if (!error) {
            // console.log('payment success')
            handleClose();
            // $('.modal-backdrop').removeClass('in').addClass('hide');
            Bert.alert("You're in! Check your inbox for more info!", "success");
            Meteor.call('amConfirmed', event._id);
            Meteor.call('sendEmail', userEmail, ...userEmailProps);
            Meteor.call('sendEmail', "info@pakke.us", ...adminEmailProps);
          }
        })
        
      
        
        //find class '.modal in' and change to '.modal hide'
        //amex 3796 330728 93002 6/18 9534 20031
        //testcard 
      }
    });
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
            height: '64px'
          },
        }}
      />
    ) : (
      <form id="payment-form" onSubmit={this.handleSubmit}>
        <fieldset>
          <div className="row">
            <label htmlFor="card-name" >Name</label>
            <input id="card-name" type="text" placeholder={this.props.user.username || "Jane Dough"}  required="" />
          </div>
        </fieldset>
        <fieldset>
            <div className="row">
            <label htmlFor="card-phone" >Phone</label>
            <input id="card-phone" type="tel" placeholder={this.props.user.phone || ""}  required="" />
          </div>        
        </fieldset>
        <fieldset>
          <div id="card-element" className="row">
            <CardElement style={{base: {fontSize: '20px'}}} />
          </div>
          <div id="card-errors" role="alert"></div>    
        </fieldset>
        <Button type="submit">Pay ${this.props.event.price}</Button>

        <div className="error" role="alert">
          <svg width="17" height="17" viewBox="0 0 17 17">
            <path className="base" fill="#000" d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z">
            </path>
            <path className="glyph" fill="#FFF" d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z">
            </path>
          </svg>
          <span className="message"></span>
        </div>
        <div className="success">
          <div className="icon">
            <svg width="84px" height="84px" viewBox="0 0 84 84" version="1.1" >
              <circle className="border" cx="42" cy="42" r="40" strokeLinecap="round" strokeWidth="4" stroke="#000" fill="none"></circle>
              <path className="checkmark" strokeLinecap="round" strokeLinejoin="round" d="M23.375 42.5488281 36.8840688 56.0578969 64.891932 28.0500338" strokeWidth="4" stroke="#000" fill="none"></path>
            </svg>
          </div>
          <h3 className="title">Payment successful</h3>
          <p className="message">
            <span>See You Soon!</span>
          </p>
          <a className="reset" href="#">
            <svg width="32px" height="32px" viewBox="0 0 32 32" version="1.1" >
              <path fill="#000000" d="M15,7.05492878 C10.5000495,7.55237307 7,11.3674463 7,16 C7,20.9705627 11.0294373,25 16,25 C20.9705627,25 25,20.9705627 25,16 C25,15.3627484 24.4834055,14.8461538 23.8461538,14.8461538 C23.2089022,14.8461538 22.6923077,15.3627484 22.6923077,16 C22.6923077,19.6960595 19.6960595,22.6923077 16,22.6923077 C12.3039405,22.6923077 9.30769231,19.6960595 9.30769231,16 C9.30769231,12.3039405 12.3039405,9.30769231 16,9.30769231 L16,12.0841673 C16,12.1800431 16.0275652,12.2738974 16.0794108,12.354546 C16.2287368,12.5868311 16.5380938,12.6540826 16.7703788,12.5047565 L22.3457501,8.92058924 L22.3457501,8.92058924 C22.4060014,8.88185624 22.4572275,8.83063012 22.4959605,8.7703788 C22.6452866,8.53809377 22.5780351,8.22873685 22.3457501,8.07941076 L22.3457501,8.07941076 L16.7703788,4.49524351 C16.6897301,4.44339794 16.5958758,4.41583275 16.5,4.41583275 C16.2238576,4.41583275 16,4.63969037 16,4.91583275 L16,7 L15,7 L15,7.05492878 Z M16,32 C7.163444,32 0,24.836556 0,16 C0,7.163444 7.163444,0 16,0 C24.836556,0 32,7.163444 32,16 C32,24.836556 24.836556,32 16,32 Z"></path>
            </svg>
          </a>
        </div>
        
      </form> 
    );
  }
}
export default injectStripe(PaymentRequestForm);
