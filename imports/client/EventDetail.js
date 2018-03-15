import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Events from '../api/Events';

class EventDetail extends Component {

  state = {
    event: {},
  }

  componentDidMount() {
    const allEvents = this.props.allEvents;
    const eventId = this.props.match.params.id;
    for (var i = 0; i < allEvents.length; i++) {
      if (allEvents[i]._id === eventId) {
        this.setState({
          event: allEvents[i]
        });
      }
    }
  }

  attendEvent() {
    console.log('submit attendee')
    let eventId = this.state.event._id;
    let thisUser = this.props.thisUser.username;
    let thisUserId = this.props.thisUserId
		Meteor.call("attendEvent", thisUserId, eventId);
    
    Bert.alert("Your are attending this event", "success", "growl-top-right");
  }


  render() {
    return (
      <div>
        <h1>Event Address: {this.state.event.eventAddress}</h1>
        <h1>Event Name: {this.state.event.eventName}</h1>
        <h1>Host: {this.state.event.eventHostUserName}</h1>
        <button onClick={this.attendEvent.bind(this)} className="btn btn-lg btn-success">Attend Event</button>
      </div>
    )
  }
}

export default withTracker(() => {
  let eventsSub = Meteor.subscribe('allEvents');
  return {
    allEvents: Events.find({}).fetch(),
    thisUser: Meteor.user(),
    thisUserId: Meteor.userId(),
  }
})(EventDetail);

