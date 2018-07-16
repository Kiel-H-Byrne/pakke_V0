import React, { Component } from 'react';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import EditVenueButton from './forms/EditVenueButton'

export default class VenueOption extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    console.log(e.target.value);
  }
	render() {
  	return (
			<div>
        <div> img: {this.props.venue.image} </div>
        <EditVenueButton />
        <div> Name: {this.props.venue.nickname} </div>
        <div> Address: {this.props.venue.address.city}, {this.props.venue.address.zip} </div>
        <FormControlLabel 
          value={this.props.venue._id} 
          control={ <Radio/>}
          label={this.props.venue.nickname}
          name="venueId"
          onChange = {this.handleChange}
          />
      </div>
		);
	}
}

		// venueOption = <venueOption venueId = {venueId}> 
// 		image, radio button, 