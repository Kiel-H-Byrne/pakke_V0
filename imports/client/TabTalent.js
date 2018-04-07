import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';


import EventForm from './forms/EventForm';
import Events from '../startup/collections/events';
import Event from './Event';



class TabHost extends Component {

    render() {


    if (!this.props.ready) {
      return <div>Loading</div>;
    } else {

      return (
        
        <div>
          <h3 className='talent-block'>You are currently not a registered talent</h3>
          <Link to='/talent'><button className='btn btn-info center-block'>Register your Talent</button></Link>
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