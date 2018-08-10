import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

import AddVenueForm from './AddVenueForm.js'

const styles = theme => ({
  paper: {
    position: 'absolute',
    // width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 1,
    width: '60%',
    minWidth: 360,
    maxWidth: '85vh',
    maxHeight: '90vh',
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%)`,
  }
});

class AddVenueModalComponent extends Component {
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
            <React.Fragment>
      <Button variant="fab" onClick={this.handleOpen} size="medium" className={classes.button}> + </Button>
      <Modal 
        aria-labelledby="Add Venue Form"
        aria-describedby="Add a new venue from which to host an experience."
        open={this.state.open}
        onClose={this.handleClose}
      >
      <div className={classes.paper + ' scroll-wrapper-y'}>
        <Typography variant="title" id="AddVenueForm-title">New Place:</Typography>
        <AddVenueForm handleClose={this.handleClose}/>
      </div>
    </Modal>
    </React.Fragment>
    );
  }
}

AddVenueModalComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const AddVenueModal = withStyles(styles)(AddVenueModalComponent);

export default AddVenueModal;