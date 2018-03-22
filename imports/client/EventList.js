import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session'

import Event from './Event';
import Events from '../startup/collections/events';

class EventList extends Component {

  /* showAll() {
    if (this.props.showAll) {
      Session.set('showAll', false);
    } else {
      Session.set('showAll', true);
    }
  } */
  render() {
    if (!this.props.ready) {
      return <div>Loading</div>;
    } else {
      return (
        <div >
            {this.props.events.map((event) => {
              return <Event event={event} key={event._id} />
            })}
        </div>
      )
    }
  }
};

export default withTracker(() => {
  const eventsSub = Meteor.subscribe('events_current');
  // let showAll = Session.get('showAll');
  return {
    currentUser: Meteor.user(),
    // showAll: showAll,
    ready: eventsSub.ready(),
    events: Events.find({}, {
      // limit: showAll ? 50 : 1,
      sort: { createdAt: -1 }
    }).fetch()
  }
})(EventList);
