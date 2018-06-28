import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session'
import { GridLoader } from 'react-spinners';

import Event from './Event2';
// import Events from '/imports/startup/collections/events';

class FeaturedEventListComponent extends Component {
  render() {
    if (!this.props.ready) {
      return <div>
        <GridLoader 
              loading={this.props.loading} 
              color='#2964ff'
              size={10}
              margin='2px'
            />
            </div>;
    } else {
      return (
            this.props.events.map((event) => {
              return <Event event={event} key={event._id} />
            })

      )
    }
  }
};

export default FeaturedEventList = withTracker(() => {
  const eventsSub = Meteor.subscribe('events_all');
  // let showAll = Session.get('showAll');
  return {
    currentUser: Meteor.user(),
    // showAll: showAll,
    ready: eventsSub.ready(),
    events: Events.find({
      "featured": true
    })
  }
})(FeaturedEventListComponent);
