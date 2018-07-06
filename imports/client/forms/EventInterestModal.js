import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

import EventInterestForm from './EventInterestForm.js'


const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%)`,
  },
  button: {
    backgroundColor: '#2964ff',
    color: '#fff',
    fontSize: '12px',
  }


});


class EventInterestModalComponent extends Component {

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
      <Button type="button" onClick={this.handleOpen} className={classes.button}> Apply </Button>
      <Modal 
        aria-labelledby="New Event Form"
        aria-describedby="Add a new experience."
        open={this.state.open}
        onClose={this.handleClose}
      >
      <div className={classes.paper + ' scroll-wrapper-y'}>
        <Typography variant="title" id="eventInterestModal">Tell us a bit about yourself:</Typography>
        <Typography variant="subheading"> A few questions will help us find you the perfect party experience! </Typography>
        <EventInterestForm user = {this.props.user} event = {this.props.event}/>
      </div>
    </Modal>
    </div>
    );
  }
}

EventInterestModalComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const EventInterestModal = withStyles(styles)(EventInterestModalComponent);

export default EventInterestModal;
