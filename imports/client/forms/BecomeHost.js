import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data';

import AddVenueForm from '../forms/AddVenueForm';
import AddEventForm from '../forms/AddEventForm';

class BecomeHostComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const loginAlert = () => Bert.alert("Please Log In First.", "info", "growl-top-right");
    let isHost;
    this.props.thisUser ? isHost = Roles.userIsInRole(this.props.thisUser._id, ["host"]) : false;

    return (
      <div className="container-host">
        <img src='Events.jpg' />
        <div className='container-text-host'>
          <h1>Host an Event</h1>
          <h3>Have a unique open space? Looking to Host an Event?</h3>
          <h3>Show off your hosting skills and cool venues!</h3>
          <p>Fill out the form below to become a host</p>
        </div>
        {this.props.thisUser ? (
          <div className='host-button'>
            <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#hostProfileModal">Form A Pakke!</button>
            <div className="modal fade" id="hostProfileModal" role="dialog">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                    <h4 className="modal-title">Form your Pakke:</h4>
                  </div>
                  <div className="modal-body">
                    <AddEventForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
            <div className='host-button'>
              <button className="btn btn-info btn-lg" onClick={loginAlert}>Become a Host</button>
            </div>
          )}
      </div>
    );
  }
}

export default BecomeHost = withTracker(() => {
  return {
    thisUser: Meteor.user()
  }
})(BecomeHostComponent);