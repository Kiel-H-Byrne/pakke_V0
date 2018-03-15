import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import EventForm from './EventForm';
import Events from '../api/Events';
import Event from './Event';



class Profile extends Component {

  addHostRole() {
    Meteor.call('addHostRole');
    Bert.alert("You are now a Host!", "success");

  }


  render() {

    const showEventForm = Roles.userIsInRole(Meteor.userId(), 'Host') ? (
      <EventForm />
    ) : <button onClick={this.addHostRole.bind(this)}>Become Host</button>;

    if (!this.props.ready) {
      return <div>Loading</div>;
    } else {
      return (
        <div>
          {/* <h1>{this.props.currentUser}</h1> */}
          <h1>This is Your Profile Page</h1>
          <p>Name:</p>

          <h2>See Events Attending here</h2>
          <main>
            {this.props.eventsFromCollection.map((event) => {
              return <Event event={event} key={event._id} />
            })} 
          </main>

          <h2>Add Event Here</h2>
          {showEventForm}
        </div>
      )
    }
  }
}


export default withTracker(() => {
  let eventsSub = Meteor.subscribe('allEvents');
  let userSub = Meteor.subscribe('currentUser');
  return {
    ready: eventsSub.ready() && userSub.ready(),
    currentUser: Meteor.userId(),
    allEvents: Events.find({}, {}).fetch(),
    eventsFromCollection: Events.find({
      attendees: { $in: [Meteor.userId()] }
    }).fetch(),
  };
})(Profile);