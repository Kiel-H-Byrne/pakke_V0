
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import EventForm from './forms/EventForm';
import Events from '../startup/collections/events';
import Event from './Event';



class TabGuest extends Component {

  render() {

      return (
        <div>
          <h2>Events I'm Attending</h2>
          <main>
            {this.props.eventsFromCollection.map((event) => {
              return <Event event={event} key={event._id} />
            })}
          </main>
        </div>
      )
    }
  }


export default withTracker(() => {
  let eventsSub = Meteor.subscribe('events_current');
  let userSub = Meteor.subscribe('currentUser');
  return {
    ready: eventsSub.ready() && userSub.ready(),
    currentUserId: Meteor.userId(),
    currentUser: Meteor.user(),
    allEvents: Events.find({}, {}).fetch(),
    eventsFromCollection: Events.find({
      guests: { $in: [Meteor.userId()] }
    }).fetch(),
  };
})(TabGuest);

