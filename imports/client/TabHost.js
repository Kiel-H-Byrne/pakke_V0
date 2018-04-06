import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';

import EventForm from './forms/EventForm';
import Events from '../startup/collections/events';
import Event from './Event';



class TabHost extends Component {

  addHostRole() {
    Meteor.call('addHostRole');
    // Bert.alert("You are now a Host!", "success");

  }


  render() {


    const showEventForm = Roles.userIsInRole(Meteor.userId(), 'Host') ? (
      <EventForm />
    ) : <button onClick={this.addHostRole.bind(this)}>Become Host</button>;

    if (!this.props.ready) {
      return <div>Loading</div>;
    } else {

      return (
        
        <div className='host-block'>
          <h3>You are currently not a host</h3>
          <Link to='/host'><button className='btn btn-info center-block'>Become a Host</button></Link>
          
          
          {/* {showEventForm} */}
        </div>
      )
    }
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
      attendees: { $in: [Meteor.userId()] }
    }).fetch(),
  };
})(TabHost);