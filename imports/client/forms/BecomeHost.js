import React, { Component } from 'react'
import FormCreateEvent from '../forms/FormCreateEvent';
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
          <h3>Show off your hosting skills and open space for unique events</h3>
          <p>Fill out the form below to become a host</p>
        </div>
        {this.props.authenticated ? (
          <>
          <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Become a Host</button>
          <div className="modal fade" id="myModal" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                  <h4 className="modal-title">Host Sign Up Form</h4>
                </div>
                <div className="modal-body">
                  <FormCreateEvent />
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