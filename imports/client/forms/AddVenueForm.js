import React, { Component } from 'react';
import { BarLoader } from 'react-spinners';
import { withTracker } from 'meteor/react-meteor-data';
import { withStyles } from '@material-ui/core/styles';

import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';

import AutoForm    from 'uniforms-material/AutoForm';
import SubmitField from 'uniforms-material/SubmitField';
import TextField   from 'uniforms-material/TextField';
import ErrorsField from 'uniforms-material/ErrorsField';
import AutoField  from 'uniforms-material/AutoField';
import HiddenField from 'uniforms-material/HiddenField';
import LongTextField from 'uniforms-material/LongTextField';

import '../../startup/collections/schemas';
import TinyInput from './TinyInput.js'
import ImagesUpload from './ImagesUpload.js'; 
import FileUpload from './FileUpload.js';
import AutoComplete from './AutoComplete.js';

const styles = theme => ({

})
// This will render an automatic, validated form, with labelled fields, inline
// validation and a submit button. If model will be present, form will be filled
// with appropriate values.
class AddVenueForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // address: ''
      place: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(doc) {
    // console.log(doc)
      Meteor.call('addVenue', doc);
      this.props.handleClose();
      analytics.track("Applied to event", {
        label: "New Venue",
        value: doc.address
      })
  }; 

  handleSuccess() {
      Bert.alert("You have a new place!", "success");
      
  };

  handleFailure() {
      Bert.alert("Sorry, Something Went Wrong", "danger", "growl-top-right");
  };
  componentDidMount() {
      let self = this;
      GoogleMaps.load();
      // const fillInAddress = this.fillInAddress;
      const getGeo = this.getGeo;
      if (this.props.loaded) {
        const completeAddress = new google.maps.places.Autocomplete(
          /** @type {!HTMLInputElement} */
          document.getElementById(`formatted_address_venues`),{
            types: ['address'],
            componentRestrictions: {country:'US'}
          }
        );
        
        completeAddress.addListener('place_changed', function() {
          // fillInAddress(this);
          const place = this.getPlace()
          console.log(place)
          self.setState({
            place: place
          })
          console.log(place.geometry.location.lat())
          // getGeo(this)
          // $(".address_group label").css('hide');
        });
      }
     this.forceUpdate();
  }  
  render() {
    const { classes } = this.props;

    const model = Schema.Venue.clean({});
    console.log(model);
    //ALLOWS FOR DEFAULT VALUES TO GET PULLED INTO FORM VALUES FOR VALIDATION/SUBMISSION. 
    //WITHOUT THIS, AUTOVALUES/DEFAULTVALUES ARE EMPTY WHEN FORM IS SUBMITTED!!!
    return (
        // <AutoForm schema={Schema.Event} onSubmit={doc => handleSubmit(doc)} model={model} onSubmitSuccess={() => console.log('Promise resolved!')}
        // onSubmitFailure={() => console.log('Promise rejected!')}/>
      <Grid container alignItems="center" direction="column" >
        <Grid item >
          <AutoForm  
          schema={Schema.Venue} 
          onSubmit={this.handleSubmit} 
          model={model}
          onSubmitSuccess={this.handleSuccess} 
          onSubmitFailure={this.handleFailure} 
          >
          <HiddenField name="hostId" />
            <AutoField name="nickname" margin="dense"/>
            <LongTextField name="description"/>
              <AutoField name="ownedStatus" margin="dense" />
              <AutoField name="type" margin="dense" />
              <AutoField name="capacity" step={1} decimal={false} max={99} min={5} margin="dense" label="How many people can comfortably fit?"/>
              <Input id={`formatted_address_venues`} ref={`file_input_venues`} fullWidth autoComplete="off" />        
                {this.state.place ? (
                <React.Fragment>
                  <HiddenField name="address" value={this.state.place.formatted_address} type="hidden" />
                  <HiddenField name="location.lat" value={this.state.place.geometry.location.lat()} type="hidden" />
                  <HiddenField name="location.lng" value={this.state.place.geometry.location.lng()} type="hidden" />
                  <img src={this.state.place.icon} />
                </React.Fragment>
                ) : ''}
              <InputLabel>Upload a picture to use for the preview!</InputLabel>
              <FileUpload name="image" module="venues" />
            <SubmitField>Submit</SubmitField>
            <ErrorsField />
          </AutoForm>
        </Grid>
      </Grid>
    );

  }
}
export default withStyles(styles)(withTracker(() => {
  return {
    loaded: GoogleMaps.loaded()    
  }
 })(AddVenueForm));
