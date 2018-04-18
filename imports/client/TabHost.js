import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';

import EventForm from './forms/FormCreateEvent';
import Events from '../startup/collections/events';
import Event from './Event';



class TabHost extends Component {

  addHostRole() {
    Meteor.call('addHostRole');
    // Bert.alert("You are now a Host!", "success");

  }


  render() {


    const isHost = Roles.userIsInRole(Meteor.userId(), ["host"])

    if (!this.props.ready) {
      return <div>Loading</div>;
    } else {

      return (
        <div className='host-block'>
        {isHost ? (
          <>
          <p>Host Profile</p>
          <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Form a Pakke!</button>
            <div className="modal fade" id="myModal" role="dialog">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                    <h4 className="modal-title">Host Sign Up Form</h4>
                  </div>
                  <div className="modal-body">
                    <EventForm />
                  </div>
                </div>
              </div>

            </div>
          </>
          ) : (
          <>
          <h3>You are currently not a host</h3>
          <Link to='/host'><button className='btn btn-info center-block'>Become a Host</button></Link>
          </>
          )
        }
          
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