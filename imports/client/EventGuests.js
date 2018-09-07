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
    console.log(this.props)
    !this.props.loading ? (
      <Grid container direction="row">
        { if (this.props.guests.length > 0) {
          this.props.guests.map( guest => {
            let thisGuest = Meteor.users.findOne(guest);
            <Grid container direction="column" item key={guest}>
              <Grid item align="center"><img className='host-image' src={thisGuest.profile.avatar} width="50" height="50" /></Grid>
              <Grid item align="center"><Typography variant="caption">{thisGuest.profile.name}</Typography></Grid>
            </Grid>
          }) }
        }
      </Grid>
      ) : <p>Loading</p>
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
  let subHandle = Meteor.subscribe('event.confirmedList', event.confirmedList);
  // let showAll = Session.get('showAll');
  return {
    loading: !subHandle.ready(),
    guests: Meteor.users.find({ _id: { $in: event.confirmedList } } ).fetch()
  }
})(EventGuests);