import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session'

import Event from './Event';
import Events from '../api/Events';
import LoginForm from './LoginPage';
import { MapContainer } from './MapContainer';
import MyMap from './MyMap';

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
    } else if (!this.props.currentUser) {
      return (
        <LoginForm />
      )
    } else {

      return (
        <div>
          {/* <button onClick={this.showAll.bind(this)}>
            Show {this.props.showAll ? 'One' : 'All'}
          </button> */}

          <div className='event-map-wrapper'>
            <main>
              {this.props.events.map((event) => {
                return <Event event={event} key={event._id} />
              })}
            </main>

            <div className='map-container'>
              <MyMap />
            </div>
          
          </div>
        </div>
      )
    }
  }
};

export default withTracker(() => {
  let eventsSub = Meteor.subscribe('allEvents');
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
