import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Events from '../startup/collections/events';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = {
  grid: {
    flexGrow: 1,
  },
  paper: {
    margin: '.5rem 0',
    padding: '.5rem' 
  },
  avatar: {
    borderRadius: '50%',
    maxHeight: '10rem',
    margin: '0 20px'
  },
  item: {
    // borderRight: '1px solid red',
  }
}

class EventGuests extends Component {
  render() {
    return (
      this.props.guests.length > 0 ? (
        <React.Fragment>
          <Paper style={styles.paper}>
            <Typography variant="display1" align="center">Your Guests:</Typography>
          
          <Grid container direction="row">
          { this.props.guests.map( guest => {
            let thisGuest = Meteor.users.findOne(guest);
            return (
              <Grid container direction="column" item xs={1} key={guest} style={styles.item}>
                <Grid item align="center"><img style={styles.avatar} src={thisGuest.profile.avatar} width="50" height="50" /></Grid>
                <Grid item align="center"><Typography variant="caption">{thisGuest.profile.name}</Typography></Grid>
              </Grid> 
            )})
          }
          </Grid>
          </Paper>
        </React.Fragment>
        ) : (
        <Paper style={styles.paper}>
          <Typography variant="display1" align="center">No Guests Yet...</Typography>
        </Paper>
        )
      )
  }
}

export default EventGuests