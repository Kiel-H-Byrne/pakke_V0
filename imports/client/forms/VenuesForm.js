import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { BarLoader } from 'react-spinners';

import AutoFields  from 'uniforms-material/AutoFields';
import AutoField  from 'uniforms-material/AutoField';
import HiddenField from 'uniforms-material/HiddenField'; 

import QuickForm  from 'uniforms-material/QuickForm';
import AutoForm    from 'uniforms-material/AutoForm';

import SubmitField from 'uniforms-material/SubmitField';
import ErrorsField from 'uniforms-material/ErrorsField';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import VenueOption from './VenueOption.js'
import AddVenueModal from './AddVenueModal.js'

class VenuesFormComponent extends Component {

	constructor(props) {
  let firstVenue; 
  props.venues ? firstVenue = props.venues[0].venueId : null
    super(props)
    this.state = {
      value: '',
      selected: firstVenue || ''
    }
    this.handleChange = this.handleChange.bind(this)
  };

  handleChange(event) {
    this.setState({ selected: event.target.value });
  };

  render() {
      if (this.props.venues && this.props.venues.length) {
      	return (
	      	<div className="venuesList">
            <RadioGroup
              aria-label="venue-id"
              onChange={this.handleChange}
            >
    		      {this.props.venues.map((venue) => {
                return (
                <div key={venue.venueId}>
                  <div> img: {venue.image} </div>
                  <div> Name: {venue.nickname} </div>
                  <div> Address: {venue.address.city}, {venue.address.zip} </div>
                  <FormControlLabel 
                    control={ <Radio checked={this.state.selected == venue.venueId} />}
                    label={venue.nickname}
                    onChange = {this.handleChange}
                    />
                </div>
                )
              })          }
            </RadioGroup>
  	        <HiddenField name="venueId" value={this.state.selected}/>
            <AddVenueModal />
		      </div>
	      )
	      } else {
  	      return <AddVenueModal />
	      }
  }
}
            
export default VenuesForm = withTracker(({ match }) => {
  let handle = Meteor.subscribe('currentUser');
  let loading = !handle.ready(); 
  let venues = Meteor.users.findOne(Meteor.userId()).profile.venues
  return {
    handle,
    loading,
    venues
  }
})(VenuesFormComponent);



// if no venues, show add venues form, 
//   else show select venues form

//     addVenues form:
// subscribe to user.profile.venues array
// if empty, show "add venue form components"
// 	else show venue selection form.

