import React from 'react';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

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
    return (
      <Grid>
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