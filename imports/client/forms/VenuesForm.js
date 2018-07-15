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
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';


import AddVenueModal from './AddVenueModal.js'
import EditVenueButton from './EditVenueButton.js'; 

const styles = {
    card: {
        maxWidth: 100,
        minWidth: 100,
        margin: 3,
    },
    image: {
        height: 75,
    },
    content: {
      padding: 2,
    },
    typo: {
        marginTop: 5,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
      padding: 2,
      // justifyContent: 'space-between',
    },
    flexRow: {
      display:'flex', 
      flexDirection: 'row', 
      alignItems:'center', 
      alignContent:'space-between'
    },
    logo: {
        maxWidth: 75,
    }
};
class VenuesFormComponent extends Component {

	constructor(props) {
    super(props)
    let firstVenue; 
    this.props.venues ? firstVenue = this.props.venues[0].venueId : ''
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
	      	<div className="venuesList" style={styles.flexRow}>
            <RadioGroup
              aria-label="venue-id"
              onChange={this.handleChange}
              style={styles.flexRow}
            >
    		      {this.props.venues.map((venue) => {
                return (
                  <Card style={styles.card} key={venue.venueId}>
                    <CardMedia style={styles.media} image={venue.image ? venue.image : `/img/holders/holder_venue_200.png` }>
                      {/* <EditVenueButton /> */}
                    </CardMedia> 
                    <CardContent style={styles.content}>
                      <Typography gutterBottom variant="headline" component="h2">
                        {venue.nickname}
                      </Typography>
                      <Typography component="p">{venue.address.city}, {venue.address.zip}</Typography>
                    </CardContent>
                    <CardActions style={styles.actions}>
                      <FormControlLabel 
                      control={ <Radio checked={this.state.selected == venue.venueId} />}
                      label={venue.nickname}
                      onChange = {this.handleChange}
                      value={venue.venueId}
                      />
                    </CardActions>
                  </Card>
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



