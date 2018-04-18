import React, { Component } from 'react'
import EditProfileHostForm from '../forms/FormEditProfileHost';
import { createContainer } from "meteor/react-meteor-data";

class BecomeHost extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const loginAlert = () => Bert.alert("Please Log In First.", "warning", "growl-top-right");
    return (
      <div className="container">
        <img src='Events.jpg' />
        <div className='container-text-host'>
          <h1>Host an Event</h1>
          <h3>Have a unique open space? Looking to Host an Event?</h3>
          <h3>Show off your hosting skills and cool venues!</h3>
          <p>Fill out the form below to become a host</p>
        </div>
        {this.props.authenticated ? (
          <>
            <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#hostProfileModal">Become a Host</button>
            <div className="modal fade" id="hostProfileModal" role="dialog">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                    <h4 className="modal-title">Host Sign Up Form</h4>
                  </div>
                  <div className="modal-body">
                    <EditProfileHostForm />
                  </div>
                </div>
              </div>

            </div>
          </>
        ) : (
            <button className="btn btn-info btn-lg" onClick={loginAlert}>Become a Host</button>
          )}
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    authenticated: Meteor.userId()
  }
}, BecomeHost);