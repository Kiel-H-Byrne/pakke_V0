import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';

import Events from '../startup/collections/events';
import Event from './Event2';



class TabGuestComponent extends Component {

  render() {

    return (
      <div>
        {(this.props.eventsFromCollection.length > 0) ? (
          <div>
            <h3>Events I'm Attending</h3>
            <div className="scroll-wrapper-x">
              {this.props.eventsFromCollection.map((event) => {
                return <Event event={event} key={event._id} />
              })}
            </div>
          </div>
        ) : (
            <div className='guest-tab'>
              <h3>I am not attending any events.</h3>
              <h4>See <Link to='/events'>Events</Link> to find something to do</h4>
            </div>
          )
        }

      </div>
    )
  }
}


export default TabGuest = withTracker(() => {
  let eventsSub = Meteor.subscribe('events_current');
  let userSub = Meteor.subscribe('currentUser');
  return {
    ready: eventsSub.ready() && userSub.ready(),
    currentUserId: Meteor.userId(),
    currentUser: Meteor.user(),
    allEvents: Events.find({}, {}).fetch(),
    eventsFromCollection: Events.find({
      appliedList: { $in: [Meteor.userId()] }
    }).fetch(),
  };
})(TabGuestComponent);

