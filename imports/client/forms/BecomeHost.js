import React from 'react'
import FormCreateEvent from '../forms/FormCreateEvent';

const isLoggedIn = Meteor.userId();
const BecomeHost = () => (
  <div className="container">
    <img src='Events.jpg'/>
    <h1>Host an Event</h1>
    <h2>Share your passion</h2>
    <h3>host events at in your space</h3>
    <p>Lorem ipsum dolor amet schlitz letterpress gentrify squid migas glossier</p>
    {isLoggedIn ? (
    <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Host an Event</button>
    ) : (
    <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#loginModal">Host an Event</button>
    
    )}

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

  </div>
)

export default BecomeHost;