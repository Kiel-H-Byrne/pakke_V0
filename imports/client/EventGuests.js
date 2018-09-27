import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Events from '../startup/collections/events';

const styles = {
  grid: {
    // flexGrow: 1,
  },
  paper: {
    margin: '.5rem 0',
    padding: '.5rem' 
  },
  avatar: {
    borderRadius: '50%',
    border: '1px solid #EEE',
    maxHeight: '10rem',
    margin: '0 20px'
  },
  item: {
    // borderRight: '1px solid red',
    margin: '0px 3px',
  }
}

class EventGuests extends Component {
  render() {
    console.log(this.props)
    return (
      this.props.guests.length > 0 ? (
        <React.Fragment>
          <hr width="70%"/>
          <Paper style={styles.paper}>
            <Typography variant="display1" align="center">Your Guests:</Typography>
            <Grid container justify="space-evenly" direction="row">
            { this.props.guests.map( guest => {
              let thisGuest = Meteor.users.findOne(guest._id);
              return (
                <Grid container direction="column" item xs={2} key={guest._id} style={styles.item}>
                  <Grid item align="center"><Avatar style={styles.avatar} src={thisGuest.profile.avatar} width="50" height="50" /></Grid>
                  <Grid item align="center"><Typography variant="caption">{thisGuest.profile.name}</Typography></Grid>
                </Grid> 
              )})
            }
            </Grid>
          </Paper>
        </React.Fragment>
        ) : (
        null 
          // <Paper style={styles.paper}>
          //   <Typography variant="headline" align="center">No Guests Yet...</Typography>
          // </Paper>
        )
      )
  }
}

export default EventGuests