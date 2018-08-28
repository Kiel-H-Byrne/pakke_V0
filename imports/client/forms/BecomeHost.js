import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import AddVenueForm from './AddVenueForm';
import AddEventModal from './AddEventModal';

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
            <Button component={Link} to="/addevent">Create A New Experience:</Button> 
          </div>
        ) : (
            <div className='host-button'>
              <Button className="btn btn-info btn-lg" onClick={loginAlert}>Become a Host</Button>
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