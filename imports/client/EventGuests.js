import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Events from '../startup/collections/events';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = {
  grid: {
    flexGrow: 1,
  },
  container: {
    maxWidth: 960,
    margin: 'auto',
  },
  table: {
    fontSize: 16,
    border: 'none',
    maxWidth: '20rem'
  },
  image: {
    height: 0,
    paddingTop: '56.25%'
  },
  cell: {
    fontSize: 14
  }
}

class EventGuests extends Component {
  render() {
    return (
      <Grid container direction="row">
        {!this.props.ready ? (
          "loading") : this.props.guests.map(function(guest) {
            let thisGuest = Meteor.users.findOne(guest);
            console.log(thisGuest)
            thisGuest ? (
            <Grid container direction="column" item key={guest}>
              <Grid item align="center"><img className='host-image' src={thisGuest.profile.avatar} width="50" height="50" /></Grid>
              <Grid item align="center"><Typography variant="caption">{thisGuest.profile.name}</Typography></Grid>
            </Grid>
          ) : (null)
          })
        }
      </Grid>
      )
    // console.log(this.props)
    //  this.props.guests ? this.props.guests.map(function(guest) {
    //     console.log(guest);
    //     return (
    //       <div>
    //         <img src={""} />
    //         <em></em>
    //       </div>
    //       )
    //     }) : return (
    //     <div></div>
    //     )
  }
}

export default withTracker(({event}) => {
  const eventSub = Meteor.subscribe('event', event);
  // let showAll = Session.get('showAll');
  return {
    ready: eventSub.ready(),
    guests: Events.findOne(event).confirmedList
  }
})(EventGuests);