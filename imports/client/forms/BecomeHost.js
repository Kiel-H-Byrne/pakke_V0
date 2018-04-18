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
        <img src='Events.jpg'/>
        <h1>Host an Event</h1>
        <h2>Share your passion</h2>
        <h3>host events at in your space</h3>
        <p>Lorem ipsum dolor amet schlitz letterpress gentrify squid migas glossierz</p>
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