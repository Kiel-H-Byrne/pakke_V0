import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session'
import { GridLoader } from 'react-spinners';

// import Event from './Event';
import Event from './Event2';
// import Events from '/imports/startup/collections/events';

class EventListComponent extends Component {
  constructor(props) {
        super(props)
        this.state = {
          eventHost: {},
          soldOut: false
        }
    }
  render() {
    return (
        this.props.events.map((event) => {
          if (!this.props.ready) {
            return (
                <GridLoader 
                key={event._id}
                loading={!this.props.ready} 
                color='#2964ff'
                size={20}
                margin='1rem' />
                )
          } else {
            return <Event key={event._id} event={event} />
          }
        })
      )
    }
  };


export default EventList = withTracker(() => {
  let eventsSub = Meteor.subscribe('events_current') && Meteor.subscribe('events_public');

  return {
    ready: eventsSub.ready(),
    events: Events.find({
      date: {
          $gte: new Date() 
        },
      $and: [
        {"isPrivate": false}]
      }, {
      sort: { date: 1 }
    }).fetch()
  }
})(EventListComponent);
