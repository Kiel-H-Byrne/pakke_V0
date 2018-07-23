import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

import AddEventForm from './AddEventForm.js'


const styles = theme => ({
  paper: {
    position: 'absolute',
    // width: theme.spacing.unit * 50,
    width: '60%',
    minWidth: 360,
    maxWidth: '85vh',
    maxHeight: '90vh',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 1,
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%)`,
  },
  button: {
    marginBottom: 30,
  }
});


class AddEventModalComponent extends Component {
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
      <Button type="button" onClick={this.handleOpen} variant="raised" size="large" className={classes.button}> Create A New Experience </Button>
      <Modal 
        aria-labelledby="New Event Form"
        aria-describedby="Add a new experience."
        open={this.state.open}
        onClose={this.handleClose}
      >
      <div className={classes.paper + ' scroll-wrapper-y'}>
        <Typography variant="display2" align="center" id="AddEventModal-title">Create your Experience:</Typography>
        <AddEventForm />
      </div>
    </Modal>
    </div>
    );
  }
}

AddEventModalComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const AddEventModal = withStyles(styles)(AddEventModalComponent);

export default AddEventModal;