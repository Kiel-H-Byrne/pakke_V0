import React from 'react';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import PageError from './PageError';
import EventList from './EventList';
import VenueList from './VenueList';
import TalentList from './TalentList';

export default class Marketplace extends React.Component {
  static propTypes = {
    // name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    // if (!Roles.userIsInRole(this.props.thisUser, ["admin"])) {
    //   return (<PageError />)
    // }
    return (
      <Grid>
        <Typography variant="h4">Experiences & Events</Typography>
        <Grid item container direction="row">
          <EventList />
        </Grid>
        <Typography variant="h4">Places & Spaces</Typography>
        <Grid item container direction="row">
          <VenueList />
        </Grid>
        <Typography variant="h4">Talented Partners & Vendors</Typography>
        <Grid item container direction="row">
          <TalentList />
        </Grid>
      </Grid>
    );
  }
}