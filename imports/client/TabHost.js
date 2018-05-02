import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';

import AddVenueForm from './forms/AddVenueForm';
import AddEventForm from './forms/AddEventForm';
import Events from '../startup/collections/events';
import Event from './Event';

class TabHost extends Component {
  render() {
    const isHost = Roles.userIsInRole(Meteor.userId(), ["host"]);
    const haveVenues = Meteor.user().profile.venues.length || false;

    if (!this.props.ready) {
      return <div>Loading</div>;
    } else {

      return (
        <div className='host-block'>
        {!isHost ? (
          <>
          <h3>You are currently not a host</h3>
          <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#hostProfileModal">Form a Pakke!</button>
            <div className="modal fade" id="hostProfileModal" role="dialog">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                    <h4 className="modal-title">Host Sign Up Form</h4>
                  </div>
                  <div className="modal-body">
                  { haveVenues ? <AddEventForm /> : <AddVenueForm /> }
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
    allEvents: Events.find({}).fetch(),
    eventsFromCollection: Events.find({
      hostId: Meteor.userId()
    }).fetch(),
  };
})(TabHost);