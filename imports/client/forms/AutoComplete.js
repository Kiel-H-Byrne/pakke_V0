import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Input from '@material-ui/core/Input';
import AutoField  from 'uniforms-material/AutoField';
import HiddenField from 'uniforms-material/HiddenField';


class AutoCompleteContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // address: ''
      place: ''
    }
  }

  // fillInAddress = autocomplete => {
  // 	const componentForm = {
  //     street_number: 'short_name',
  //     route: 'long_name',
  //     locality: 'long_name',
  //     sublocality_level_1: 'short_name',        
  //     administrative_area_level_1: 'short_name',
  //     country: 'short_name',
  //     postal_code: 'short_name',
  //   };
  //   const place = autocomplete.getPlace();
    
  //   for (let component in componentForm) {
  //     // CLEAR ALL VALUES AND SET 'DISABLED' FIELDS TO FALSE SO WE CAN POPULATE THEM
  //     if (document.getElementById(component)){
  //       document.getElementById(component).value = '';
  //       document.getElementById(component).disabled = false;
  //     }
  //   }
  //   // Get each component of the address from the place details
  //   // and fill the corresponding field on the form.
  //   let num;
  //   for (let i = 0; i < place.address_components.length; i++) {
    
  //     let addressType = place.address_components[i].types[0];
  //     if (componentForm[addressType]) {
        
  //       if (addressType == 'street_number') {
  //         let val = place.address_components[i][componentForm[addressType]];
  //         // document.getElementById('route').value = val;
  //         num = val;
  //       } else if (addressType == 'route') {
  //         let val = place.address_components[i][componentForm[addressType]];
  //         // document.getElementById('route').value = `${document.getElementById('route').value}  ${val}`;
  //         if (num) {
  //           document.getElementById('route').value = `${num} ${val}`;
  //         } else {
  //           document.getElementById(addressType).value = val;
  //         }
  //       } else if (addressType == 'sublocality_level_1') {
  //           document.getElementById('locality').value = val;
  //       } else {
  //         let val = place.address_components[i][componentForm[addressType]];
  //         document.getElementById(addressType).value = val;
  //       }
  //       //
  //     }
  //   }

  //   if (place.formatted_address) {
  //   	document.getElementById(`formatted_address_${this.props.module}`).value = place.formatted_address
  //   	this.setState({address: place.formatted_address})

  //   };
  //   this.forceUpdate();
  // };
  getGeo = autocomplete => {
    const place = autocomplete.getPlace();
    console.log(place)
  }

	componentDidMount() {
      let self = this;
	    GoogleMaps.load();
		  // const fillInAddress = this.fillInAddress;
      const getGeo = this.getGeo;
			const module = this.props.module;
			if (this.props.loaded && module) {
		    const completeAddress = new google.maps.places.Autocomplete(
					/** @type {!HTMLInputElement} */
					document.getElementById(`formatted_address_${module}`),{
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
    console.log(this.state)
		return (
			
			<React.Fragment>
    		<Input id={`formatted_address_${this.props.module}`} ref={`file_input_${this.props.module}`} fullWidth autoComplete="off" />				
				{this.state.place ? (
        <React.Fragment>
          <HiddenField name="formatted_address" value={this.state.place.formatted_address} />
          <HiddenField name="location.lat" />
          <HiddenField name="location.lng" />
  				{/* <img src={this.state.place.icon} /> */}
        </React.Fragment>
        ) : ''}

			</React.Fragment>
		);
	}
}

export default AutoComplete = withTracker(() => {
  return {
    loaded: GoogleMaps.loaded()    
  }
 })();


