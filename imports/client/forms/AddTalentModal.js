import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import ButtonBase from '@material-ui/core/ButtonBase';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import AddTalentForm from './AddTalentForm.js'


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
  },
  button: {
    maxWidth: 120,
    minWidth: 100,
    margin: '1rem',
    // border: "1px dashed #226199",
    float: "left",
  },
  card: {
    backgroundColor: '#cdfaf6'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  content: {
    padding: 2,
  },
});


class AddTalentModalComponent extends Component {
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
      <ButtonBase focusRipple className={classes.button} >
      <Card elevation={5} onClick={this.handleOpen} className={classes.card}  >
        <CardMedia className={classes.media} image="https://loremflickr.com/320/240/artist" />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="subtitle1" align="center">
            Add Your Talent
          </Typography>
          <Typography component="p" variant="caption" gutterBottom>Offer your talent for an event in your community!</Typography>
        </CardContent>
      </Card>
      <Modal 
        aria-labelledby="Talent Registration Form"
        aria-describedby="Add a new talent."
        open={this.state.open}
        onClose={this.handleClose}
      >
      <div className={classes.paper + ' scroll-wrapper-y'}>
        <Typography variant="h6" id="addTalentModal">Add Your Talent:</Typography>
        <AddTalentForm user = {this.props.user}/>
      </div>
    </Modal>
    </ButtonBase>
    );
  }
}

AddTalentModalComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const AddTalentModal = withStyles(styles)(AddTalentModalComponent);

export default AddTalentModal;
