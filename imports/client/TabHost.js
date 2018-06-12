import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';

import AddVenueForm from './forms/AddVenueForm';
import AddEventForm from './forms/AddEventForm';
import Events from '../startup/collections/events';
import Event from './Event';

const HostModal = (props) => {
  return (
    <div className="modal fade" id="hostProfileModal" role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal">&times;</button>
            <h4 className="modal-title">Form a Pakke!</h4>
          </div>
          <div className="modal-body">
            <AddEventForm />
          </div>
        </div>
      </div>
    </div>
  )
};

class TabHost extends Component {
  render() {
    const isHost = Roles.userIsInRole(Meteor.userId(), ["host"]);

    if (!this.props.ready) {
      return <div>Loading</div>;
    }

    return (
      <div className='host-block'>
        {!isHost ? (
          <div>
            <h3>You are not currently Hosting.</h3>
            <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#hostProfileModal">Form a Pakke!</button>
            <HostModal />
          </div>
          ) : (
          <div>
            <h3>Your Pakkes:</h3>
            <div className="scroll-wrapper-x">
            {this.props.eventsFromCollection.map((event) => {
              return <Event event={event} key={event._id} />
            })}
            </div>
            <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#hostProfileModal">Form another Pakke!</button>
            <HostModal />
          </div>
          )
        }
      </div>
    )
  }
}

export default withTracker(({user}) => {
  let eventsSub = Meteor.subscribe('events_hosted', user._id)

  return {
    ready: eventsSub.ready(),
    eventsFromCollection: Events.find({
      hostId: user._id
    }).fetch()
  };
})(TabHost);