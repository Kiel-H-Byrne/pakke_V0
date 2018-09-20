import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session'
import { GridLoader } from 'react-spinners';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// import VenueCard from './VenueCard';
import Venues from '/imports/startup/collections/venues';

const styles = {
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
    // radio: {
    //   // width: '100%',
    //   height: '0.8rem',
    //   // paddingBottom: '.5rem'
    // },
};

class VenueListComponent extends Component {
  constructor(props) {
        super(props)
        this.state = {
          eventHost: {},
          soldOut: false
        }
        console.log(props)
    }
  render() {
    return (
        this.props.venues.map((venue) => {
          if (!this.props.ready) {
            return (
                <GridLoader 
                key={event._id}
                loading={!this.props.ready} 
                color='#2964ff'
                size={20}
                margin='1rem' />
                )
          } else {
            return <Card style={styles.card} key={venue._id}>
                        <CardMedia style={styles.media} image={venue.image ? venue.image : `/img/holders/holder_venue_200.png` }>
                          {/* <EditVenueButton /> */}
                        </CardMedia> 
                        <CardContent style={styles.content}>
                          <Typography gutterBottom variant="subheading" align="center">
                            <em>"{venue.nickname}"</em>
                          </Typography>
                          <Typography component="p" variant="caption" gutterBottom>{venue.address}</Typography>
                          <Typography component="p" variant="caption" gutterBottom>{venue.type}: Holds {venue.capacity}</Typography>
                        </CardContent>
                        {/* <CardActions >
                          <Radio 
                          style={styles.radio}
                          checked={this.state.selected === venue._id} 
                          onChange={this.handleChange}
                          value={venue._id}
                          name="venueRadio"
                          id={`vri_${venue._id}`}
                          aria-label={venue.nickname}
                          />
                           <EditVenueButton venue={venue}/> 
                        </CardActions> */}
                      </Card>

          }
        })
      )
    }
  };


export default VenueList = withTracker(() => {
  let venuesSub = Meteor.subscribe('venues_all');

  return {
    ready: venuesSub.ready(),
    venues: Venues.find().fetch()
  }
})(VenueListComponent);
