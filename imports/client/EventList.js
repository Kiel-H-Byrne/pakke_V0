import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session'

import Event from './Event';
import Event2 from './Event2';
import Events from '/imports/startup/collections/events';

class EventList extends Component {

  render() {
    if (!this.props.ready) {
      return <div>Loading</div>;
    } else {
      return (
        this.props.events.map((event) => {
            return <Event2 event={event} key={event._id} />
        })


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
    events: Events.find({
      date: {
        $gte: new Date()
      }
    },
      {
        sort: { date: 1 }
      }).fetch()
  }
})(EventList);
