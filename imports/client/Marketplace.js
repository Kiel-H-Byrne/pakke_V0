import React from 'react';

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
      <div>
        <EventList />
        <VenueList />

      </div>
    );
  }
}


//MARKETPLACE HAS VENUES, TALENT, EVENTS LISTED. 

// VENUESLIST
// talentlist
// eventslist
// filter
