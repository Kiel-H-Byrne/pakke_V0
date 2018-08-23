import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit'
import InputLabel from '@material-ui/core/InputLabel';

import AutoField  from 'uniforms-material/AutoField';
import AutoForm    from 'uniforms-material/AutoForm';
import SubmitField from 'uniforms-material/SubmitField';
import TextField   from 'uniforms-material/TextField';
import ErrorsField from 'uniforms-material/ErrorsField';
import LongTextField from 'uniforms-material/LongTextField'; 


import FileUpload from './FileUpload.js';


const styles = theme => ({
  paper: {
    position: 'absolute',
    // width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 1,
    maxHeight: '90vh',
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%)`,
  },
})

 class EditVenueButtonComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    };
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }
  handleSubmit = (doc) => {
    console.log(doc,this);
    Meteor.call('editVenue', this.props.venue._id, doc);
    this.handleClose();
  }; 

  handleSuccess = () => {
      Bert.alert("Well done!", "success");

  }
  handleFailure = () =>  {
      Bert.alert("Try that again...", "danger", "growl-top-right");
  }
   handleOpen = () =>  {
    this.setState({ open: true });
  }
  handleClose = () => {
    this.setState({ open: false });
  }

  deleteVenue = venue => {
    if (confirm('Are you sure you want to delete this venue?')) {
      Meteor.call('deleteVenue', venue, (err, res) => {
        //IF NO CONFIRMED GUESTS (PAID) THEN OK TO DELETE, OR IF NOT PAST
      })
    }
  }
  render() {
    
    const { classes } = this.props;
    const model = this.props.venue;
    // console.log(model)
    return (
      <div>
      <Button 
      variant="fab"
      mini
      onClick={this.handleOpen}>
        <EditIcon />
        </Button>
      <Modal 
        aria-labelledby="Edit Venue"
        aria-describedby="Edit your Venue"
        open={this.state.open}
        onClose={this.handleClose}

      > 
        <div className={classes.paper + ' scroll-wrapper-y'}>
          <Typography variant="display2" align="center" id="eventPurchaseModal">Edit Venue:</Typography>
          <AutoForm  
          schema={Schema.Venue} 
          onSubmit={this.handleSubmit} 
          model={model}
          onSubmitSuccess={this.handleSuccess} 
          onSubmitFailure={this.handleFailure} 
          >
            <AutoField name="nickname" margin="dense" />
              <LongTextField name="description" />
                <AutoField name="ownedStatus" margin="dense" />
                <AutoField name="type" margin="dense" />
                <AutoField name="capacity" margin="dense" value={model.address} />
                <FileUpload name="image" module="venues" value={model.image} />
              <SubmitField>Submit</SubmitField>
              <Button style={{backgroundColor: "transparent", color: "red", marginLeft: '1rem'}} size="small" variant="outlined" onClick={() => this.deleteVenue(this.props.venue)}>Remove Venue</Button>
              <ErrorsField />
            </AutoForm>
        </div>
      </Modal>
    </div>
    )
  }
}

const EditVenueButton = withStyles(styles)(EditVenueButtonComponent);

export default EditVenueButton
