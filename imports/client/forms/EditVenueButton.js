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
    console.log(props)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }
  handleSubmit = (doc) => {
    console.log(doc,this);
    // Meteor.call('editVenue', this.props.venue._id, doc);
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

  render() {
    
    const { classes } = this.props;
    const model = Schema.Venue.clean(this.props.event);

    return (
      <div>
        <EditIcon onClick={this.handleOpen}/>
      <Modal 
        aria-labelledby="Edit Event"
        aria-describedby="Edit your event"
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
                <AutoField name="capacity" margin="dense" />
                <FileUpload name="image" module="venues" value={model.image} />
              <SubmitField>Submit</SubmitField>
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
