import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { BarLoader } from 'react-spinners';

import AutoFields  from 'uniforms-material/AutoFields';
import AutoField  from 'uniforms-material/AutoField';
import QuickForm  from 'uniforms-material/QuickForm';
import AutoForm    from 'uniforms-material/AutoForm';
import SubmitField from 'uniforms-material/SubmitField';
import ErrorsField from 'uniforms-material/ErrorsField';

import VenueOption from './VenueOption.js'
// import AddVenueModal from './AddVenueModal.js'

class VenuesFormComponent extends Component {
	constructor(props) {
    super(props)
    this.state = {
      venueId: ''
    }
  }

  render() {
      if (this.props.venues.length) {
      	return (
	      	<div className="venuesList">
		      {this.props.venues.map((venue) => {return <VenueOption venue={venue} key={venue.venueId} /> }
	        )}
	        <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#addVenueModal">New Venue</button>
		      </div>
	      )
	      } else {
	      return (
          <div>
  		      <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#addVenueModal">New Venue</button>
          </div>
		      )
	      }
  }
}

export default VenuesForm = withTracker(({ match }) => {
  let handle = Meteor.subscribe('currentUser');
  let loading = !handle.ready(); 
  let venues = Meteor.user().profile.venues;
  
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

