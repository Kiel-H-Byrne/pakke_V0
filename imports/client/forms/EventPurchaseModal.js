import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { StripeProvider, Elements } from 'react-stripe-elements';
import analytics from '/lib/analytics/analytics.min.js';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

import PaymentRequestForm from './PaymentRequestForm'
// import EventPurchaseForm from './EventPurchaseForm.js'


const styles = theme => ({
  paper: {
    position: 'absolute',
    minWidth: 350,
    maxWidth: 720,
    maxHeight: '90vh',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 1,
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%)`,
  },
});


class EventPurchaseModalComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    };
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }
  handleOpen() {
    this.setState({ open: true });
    analytics.track('Product Viewed', {
      product_id: this.props.event._id,
      name: this.props.event.byline,
      price: this.props.event.price,
      quantity: 1,
      image_url: this.props.event.image,
      currency: 'usd',
      value: this.props.event.price - ((this.props.event.price*.029)+.30),
    });
  };
  handleClose() {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button type="button" onClick={this.handleOpen} className={classes.button} fullWidth={true} > Buy Tickets </Button>
        <Modal 
          aria-labelledby="Event Purchase Form"
          aria-describedby="Buy a ticket for this event."
          open={this.state.open}
          onClose={this.handleClose}
        >
        <div className={classes.paper + ' scroll-wrapper-y '}>
          <h3 className="">"{this.props.event.byline}"</h3>
          <StripeProvider apiKey={ Meteor.settings.public.keys.stripe.key }>
            <Elements>
              <PaymentRequestForm event = {this.props.event} user = {this.props.user} handleClose={this.handleClose} />
            </Elements>
          </StripeProvider>
        </div>
      </Modal>
    </div>
    );
  }
}

EventPurchaseModalComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const EventPurchaseModal = withStyles(styles)(EventPurchaseModalComponent);

export default EventPurchaseModal;
