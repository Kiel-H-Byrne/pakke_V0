import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import EventForm from './EventForm';
import Events from '../startup/collections/events';
import Event from './Event';
import TabGuest from './TabGuest';
import TabHost from './TabHost';



class PageProfile extends Component {

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
          <p>Name: {this.props.currentUser.username}</p>


          <ul className="nav nav-tabs">
            <li className="active"><a data-toggle="tab" href="#home">Guest</a></li>
            <li><a data-toggle="tab" href="#menu1">Host</a></li>
            <li><a data-toggle="tab" href="#menu2">Talent</a></li>
          </ul>

          <div className="tab-content">
            <div id="home" className="tab-pane fade in active">
              <TabGuest />
            </div>
            <div id="menu1" className="tab-pane fade">
              <TabHost />
            </div>
            <div id="menu2" className="tab-pane fade">
              <p>Some content in menu 2.</p>
            </div>
          </div>
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
})(PageProfile);