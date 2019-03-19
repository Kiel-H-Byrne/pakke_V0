import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import AddVenueModal from './forms/AddVenueModal';
import AddTalentModal from './forms/AddTalentModal';
import AddEventModal from './forms/AddEventModal';
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
    // if (!Roles.userIsInRole(this.props.thisUser, ["admin"])) {
    //   return (<PageError />)
    // }
    return (
      <Grid>
        <Typography variant="h4">Experiences & Events</Typography>
        <Grid item container direction="row">
          <EventList />
          <AddEventModal />
        </Grid>
        <Typography variant="h4">Places & Spaces</Typography>
        <Grid item container direction="row">
          <AddVenueModal />
          <VenueList />
        </Grid>
        <Typography variant="h4">Talented Partners & Vendors</Typography>
        <Grid item container direction="row">
          <AddTalentModal />
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