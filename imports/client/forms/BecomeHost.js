import React from 'react'
import FormBecomeHost from '../FormBecomeHost';


const BecomeHost = () => (
  <div className="container">
    <img src='Events.jpg'/>
    <h1>Become a Host</h1>
    <h2>Share your passion</h2>
    <h3>host events at in your space</h3>
    <p>Lorem ipsum dolor amet schlitz letterpress gentrify squid migas glossier</p>

    <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Become a Host</button>


    <div className="modal fade" id="myModal" role="dialog">
      <div className="modal-dialog">


        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal">&times;</button>
            <h4 className="modal-title">Host Sign Up Form</h4>
          </div>
          <div className="modal-body">
            <FormBecomeHost />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>

      </div>
    </div>

  </div>
)

export default BecomeHost;