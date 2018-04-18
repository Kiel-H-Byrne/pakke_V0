import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import Events from '../startup/collections/events';

class EventDetail extends Component {
  
  state = {
    event: {}
  }

  componentDidMount() {
    const allEvents = this.props.allEvents;
    const eventId = this.props.match.params.id;
    // const event = Events.findOne( eventId );

    // console.log(Events.findOne( eventId ) );
    // this.setState({
    //   event: Events.findOne( eventId )
    // });
    //this will be very inefficient as the database grows.
    for (let i = 0; i < allEvents.length; i++) {
      if (allEvents[i]._id === eventId) {
        // console.log(allEvents[i])
        this.setState({
          event: allEvents[i]
        });
      }
    }
  }

  attendEvent() {
    // console.log('submit attendee')
    const eventId = this.state.event._id;

    const thisUserId = Meteor.userId();
    Meteor.call("attendEvent", thisUserId, eventId);

    Bert.alert("Your are attending this event", "success", "growl-top-right");
  }

  render() {
  

    const loginAlert = () => Bert.alert("Please Log In First.", "warning", "growl-top-right");
    return (
      <div>
        <img className='event-detail-image' src={this.state.event.image} alt='image' />
        <h1>{this.state.event.byline}</h1>
        <p>{this.state.event.description}</p>

        <div className='event-detail-bottom'>

          <div className='host-info'>
            <img className='host-image' src='/missing_profile.png' />
            <h3>Host Name</h3>
            {/* <h3>{this.state.event.host.email}</h3> */}
          </div>


          <div className='attend-event-button-area'>
            <div className='attend-event-button'>
            <p>25$ per person </p>
              {this.props.thisUserId ? ( 
                <button onClick={this.attendEvent.bind(this)} className="btn btn-lg btn-success">Attend Event</button> 
              ) : (
                <button onClick={loginAlert} className="btn btn-success btn-lg" >Attend Event</button>
              )}
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default withTracker(() => {
  let eventsSub = Meteor.subscribe('events_current');
  return {
    allEvents: Events.find().fetch(),
    thisUser: Meteor.user(),
    thisUserId: Meteor.userId(),
  }
})(EventDetail);

