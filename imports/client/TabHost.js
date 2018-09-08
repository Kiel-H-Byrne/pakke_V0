import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { BarLoader } from 'react-spinners';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';

import Events from '../startup/collections/events';
import Venues from '../startup/collections/venues';
import AddEventModal from './forms/AddEventModal.js'
import EditVenueButton from './forms/EditVenueButton.js'; 
import Event from './Event2';

const styles={
  card: {
        maxWidth: 140,
        minWidth: 100,
        margin: '1rem',
    },
    content: {
      padding: 2,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    radio: {
      // width: '100%',
      height: '0.8rem',
      // paddingBottom: '.5rem'
    },
}

class TabHostComponent extends Component {
  render() {
    const isHost = Roles.userIsInRole(Meteor.userId(), ["host"]);

    if (!this.props.ready) {
      return <BarLoader 
              loading={this.props.loading} 
              color='#2964ff'
              width={-1}
              height={10}
            />;
    }

    return (
      <div className='host-block' style={{margin: '1rem 0'}}>

        {!isHost ? (
            <h3>You are not currently Hosting.</h3>
          ) : (
          <React.Fragment>
          <div>
            <h3>Your Venues:</h3>
            <div className="scroll-wrapper-x">
            {this.props.venues.map((venue) => {
              return (
                <Card style={styles.card} key={venue._id}>
                  <CardMedia style={styles.media} image={venue.image ? venue.image : `/img/holders/holder_venue_200.png` }>
                    
                  </CardMedia> 
                  <CardContent style={styles.content}>
                    <Typography gutterBottom variant="subheading" align="center">
                      <em>"{venue.nickname}"</em>
                    </Typography>
                    <Typography component="p" variant="caption" gutterBottom>{venue.address}</Typography>
                    <Typography component="p" variant="caption" gutterBottom>{venue.type}: Holds {venue.capacity}</Typography>
                  </CardContent>
                  <CardActions >
                  <EditVenueButton venue={venue}/>
                  </CardActions>
                </Card>
                )
              }
            )
          }

            </div>
          </div>
          <div>
            <h3>Your PAKKEs:</h3>
            <div className="scroll-wrapper-x">
              {this.props.events.map((event) => {
                return <Event event={event} key={event._id} />
              })}
            </div>
          </div>
          </React.Fragment>
          )
        }
      <Button component={Link} to="/addevent">Create A New Experience:</Button> 

      </div>
    )
  }
}

export default TabHost = withTracker(({user}) => {
  let eventsSub = Meteor.subscribe('my_events')
  let venuesSub = Meteor.subscribe('my_venues')

  return {
    ready: eventsSub.ready() && venuesSub.ready(),
    events: Events.find({
      hostId: user._id
    }).fetch(),
    venues: Venues.find({
      hostId: user._id
    }).fetch()
  };
})(TabHostComponent);