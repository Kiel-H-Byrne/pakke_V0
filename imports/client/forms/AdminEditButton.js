import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit'

import AutoField  from 'uniforms-material/AutoField';
import AutoFields  from 'uniforms-material/AutoFields';
import HiddenField  from 'uniforms-material/HiddenField';
import NumField  from 'uniforms-material/NumField';
import AutoForm    from 'uniforms-material/AutoForm';
import SubmitField from 'uniforms-material/SubmitField';
import TextField   from 'uniforms-material/TextField';
import ErrorsField from 'uniforms-material/ErrorsField';
import InputLabel from '@material-ui/core/InputLabel';
import Fab from '@material-ui/core/Fab';

import DateTime from '../DateTime.js'
import FileUpload from './FileUpload.js';
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

 class AdminEditButton extends Component {
	constructor(props) {
		super(props)
		this.state = {
	    open: false,
      hasGuests: false || !!props.event.confirmedList.length
	  };
		this.handleOpen = this.handleOpen.bind(this)
		this.handleClose = this.handleClose.bind(this)
    
	}
	handleSubmit = (doc) => {
    // console.log(doc)
    Meteor.call('editEvent', this.props.event._id, doc);
  }; 

  handleSuccess = () => {
      Bert.alert("Your Event Was Updated.", "pk-success", "fixed-bottom", "fa-check");
      this.handleClose();
  }

  handleFailure = () => {
      Bert.alert("Try that again...", "pk-danger", "fixed-bottom", "growl-top-right");
  }
   handleOpen = () => {
    this.setState({ open: true });
  }
  handleClose = () =>  {
    this.setState({ open: false });
  }
  cancelEvent = () => {
    if (confirm('Are you sure you want to delete this event?')) {
      Meteor.call('cancelEvent', this.props.event, (err, res) => {
        //IF NO CONFIRMED GUESTS (PAID) THEN OK TO DELETE, OR IF NOT PAST
      })
    }
  }

	render() {
		
		const { classes } = this.props;
    const model = this.props.event;
    const omitFields = [];

		return (
			<div>
	    <Fab size="small" aria-label="edit" className={classes.button} onClick={this.handleOpen}> 
				<EditIcon />
			</Fab>
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
          className="tinyForm"
  	      >
            <AutoFields/>
            <ErrorsField />            
            <SubmitField value="Submit" />
            <Button style={{backgroundColor: "transparent", color: "red", marginLeft: '1rem'}} size="small" variant="outlined" onClick={this.cancelEvent}>Cancel Event </Button>
  	      </AutoForm>
        </div>
      </Modal>
    </div>
		)
	}
}

export default withStyles(styles)(AdminEditButton);
