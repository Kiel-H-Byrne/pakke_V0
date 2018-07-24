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
import Input from '@material-ui/core/Input';

import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import Venues from '/imports/startup/collections/venues';
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
    this.state = {
      selected: ""
    }
    this.handleChange = this.handleChange.bind(this)
    (props.firstVenue) ? (this.state.selected = firstVenue) : null
  };

  handleChange(event) {
    console.log(event)
    if (event){
      this.setState({ selected: event.target.value });
    }
  };
  render() {
    if (this.props.loading) {
      console.log('loading...')
      return (
        <BarLoader 
          loading={this.props.loading} 
          color='#2964ff'
          width={-1}
          height={5}
        />
      )
    }

  	return (
            <>
      <input name="venueId" value={this.state.selected} type="hidden"/>
    	<div className="venuesList" >
        <Typography align="center" variant="display1">Your Places:</Typography>
        { (this.props.venues && this.props.venues.length) ? (
          <div style={styles.flexRow}>
    		      {this.props.venues.map((venue) => {
                return (
                  <Card style={styles.card} key={venue._id}>
                    <CardMedia style={styles.media} image={venue.image ? venue.image : `/img/holders/holder_venue_200.png` }>
                      {/* <EditVenueButton /> */}
                    </CardMedia> 
                    <CardContent style={styles.content}>
                      <Typography gutterBottom variant="headline" component="h2">
                        {venue.nickname}
                      </Typography>
                      <Typography component="p">{venue.address.city}, {venue.address.zip}</Typography>
                      <Radio 
                      checked={this.state.selected == venue._id} 
                      onChange = {() => {this.handleChange}}
                      value={venue._id}
                      align="center"
                      id={`vri_${venue._id}`}
                      />
                    </CardContent>
                  </Card>
                  )
                }
              )          
            }
            <AddVenueModal />
          </div>
          ) : (
          <div>
            <Typography variant="title">Add A Place:</Typography>
            <AddVenueModal />
          </div>
          )
        }
      </div>
      </>
    )
  }
}
            
export default VenuesForm = withTracker((props) => {
  const handle = Meteor.subscribe('my_venues');
  const loading = !handle.ready();
  let venues, firstVenue;
  if (!loading) {
    venues = Venues.find({ hostId: Meteor.userId() }).fetch()
    firstVenue = venues[0]
  }
  return {
    loading,
    venues,
    firstVenue
  }
})(VenuesFormComponent);


