import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit'

import AutoField  from 'uniforms-material/AutoFields';
import AutoForm    from 'uniforms-material/AutoForm';
import SubmitField from 'uniforms-material/SubmitField';
import TextField   from 'uniforms-material/TextField';
import ErrorsField from 'uniforms-material/ErrorsField';
import EventImagesUpload from './EventImagesUpload.js'; 
import VenuesForm from './VenuesForm';

import TinyInput from './TinyInput.js'

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

 class EditEventButton extends Component {

 
	constructor(props) {
		super(props)
		this.state = {
	    open: false,
	  };
		this.handleOpen = this.handleOpen.bind(this)
		this.handleClose = this.handleClose.bind(this)
	}
	handleSubmit(doc) {
      Meteor.call('editEvent', doc);
  }; 

  handleSuccess() {
      Bert.alert("Your Profile Was Updated!", "success");
      $('#hostProfileModal').modal('toggle');

  }
  handleFailure() {
      Bert.alert("Sorry, Something Went Wrong", "danger", "growl-top-right");
  }
   handleOpen() {
    this.setState({ open: true });
  }
  handleClose() {
    this.setState({ open: false });
  }

	render() {
		
		const { classes } = this.props;
    const model = Schema.Event.clean(this.props.event);
    const omitFields = ["submitted", "venue", "hostId", "categories", "appliedList", "invitedList", "confirmedList", "entertainers", "partner", "featured"];

		return (
			<div>
	    <Button variant="fab" aria-label="edit" className={classes.button} onClick={this.handleOpen}> 
				<EditIcon />
			</Button>
			<Modal 
        aria-labelledby="Edit Event"
        aria-describedby="Edit your event."
        open={this.state.open}
        onClose={this.handleClose}

      > 
        <div className={classes.paper + ' scroll-wrapper-y'}>
          <Typography variant="display2" align="center" id="eventPurchaseModal">Edit Event:</Typography>
          <AutoForm  
  	      schema={Schema.Event} 
  	      onSubmit={this.handleSubmit} 
  	      model={model}
  	      onSubmitSuccess={this.handleSuccess} 
  	      onSubmitFailure={this.handleFailure} 
  	      >
            <VenuesForm />
            <AutoField name="byline" margin="dense"/>
            <TinyInput name="description" content = {model.description}/>
            <AutoField name="date" margin="dense" />
            <AutoField name="duration" margin="dense" />
            <AutoField name="size" margin="dense" />
            <AutoField name="price" margin="dense" />
            <AutoField name="contact" margin="dense" />
            
            <SubmitField value="Submit" />
            <ErrorsField />
  	      </AutoForm>
        </div>
      </Modal>
    </div>
		)
	}
}

export default withStyles(styles)(EditEventButton);
