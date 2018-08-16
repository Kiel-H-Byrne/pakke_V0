import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import AddLocationIcon from '@material-ui/icons/AddLocation'

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
    transform: `translate(-50%, -50%)`
  },
  card: {
    maxWidth: 120,
    minWidth: 100,
    margin: '1rem',
    // border: "1px dashed #226199",
    float: "left"
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  content: {
    padding: 2,
  },
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
        <ButtonBase focusRipple className={classes.card} >
      {/* <Button variant="fab" onClick={this.handleOpen} className={classes.button}> <AddLocationIcon /> </Button> */}
      <Card elevation={2} onClick={this.handleOpen} >
        <CardMedia className={classes.media} image="/img/holders/holder_venue_200.png" />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="subheading" align="center">
            Add New Place
          </Typography>
          <Typography component="p" variant="caption" gutterBottom>Add your home, business, or office where you will host your next event!</Typography>
        </CardContent>
      </Card>
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
    </ButtonBase>
    );
  }
}

AddVenueModalComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const AddVenueModal = withStyles(styles)(AddVenueModalComponent);

export default AddVenueModal;