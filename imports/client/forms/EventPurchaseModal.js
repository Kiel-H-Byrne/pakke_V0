import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

import EventPurchaseForm from './EventPurchaseForm.js'


const styles = theme => ({
  paper: {
    position: 'absolute',
    // width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 1,
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%)`,
  },
});


class EventPurchaseModalComponent extends Component {
  state = {
    open: false,
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };


  render() {
    const { classes } = this.props;

    return (
            <div>
      <Button type="button" onClick={this.handleOpen} className={classes.button}> Buy Tickets </Button>
      <Modal 
        aria-labelledby="New Event Form"
        aria-describedby="Add a new experience."
        open={this.state.open}
        onClose={this.handleClose}
      >
      <div className={classes.paper}>
        <Typography variant="title" id="eventPurchaseModal">Buy Ticket:</Typography>
        <EventPurchaseForm user = {this.props.user} event = {this.props.event}  />
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
