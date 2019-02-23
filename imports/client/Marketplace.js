import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import PageError from './PageError';
import EventList from './EventList';
import VenueList from './VenueList';
import TalentList from './TalentList';

class Marketplace extends React.Component {
  static propTypes = {
    // name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { thisUser, loading } = this.props;
    // if (!loading && !Roles.userIsInRole(thisUser, ["admin"])) {
    //   return (<PageError />)
    // }
    return (
      <Grid container>
        <Typography>Events</Typography>
        <Grid item container direction="row">
          <EventList />
        </Grid>
        <Typography>Venues</Typography>
        <Grid item container direction="row">
          <VenueList />
        </Grid>
        <Typography>Entertainment</Typography>
        <Grid item container direction="row">
          <TalentList />
        </Grid>
      </Grid>
    );
  }
}

export default withTracker(() => {
  const subscription = Meteor.subscribe('roles');
  const loading = !subscription.ready();
    return {
      loading,
      thisUser: Meteor.userId()
    }
})(Marketplace)