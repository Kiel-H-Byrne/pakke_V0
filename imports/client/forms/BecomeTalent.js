import React, { Component } from 'react'
import AddTalentForm from './AddTalentForm';
import { withTracker } from 'meteor/react-meteor-data';

class BecomeTalent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const loginAlert = () => Bert.alert("Please Log In First.", "info", "growl-top-right");
    return (
      <div className="container-host">
        <img src='Talent.jpg' />
        <div className='container-text-talent'>
          <h1>Share Your Talent</h1>
          <h2>Show us what you got</h2>
          <h3>Perform at new venues around the city and make extra cash.</h3>
          <p>Click the button below to register your tallent with Pakke</p>
        </div>
        {this.props.authenticated ? (
          <>
            <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#talentProfileModal">Register Your Talent</button>
            <div className="modal fade" id="talentProfileModal" role="dialog">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                    <h4 className="modal-title">Talent Sign Up Form</h4>
                  </div>
                  <div className="modal-body">
                    <AddTalentForm />
                  </div>
                </div>
              </div>

            </div>
          </>
        ) : (
            <button className="btn btn-info btn-lg" onClick={loginAlert}>Register Your Talent</button>
          )
        }
      </div>
    );
  }
};

export default withTracker(() => {
  return {
    authenticated: Meteor.userId()
  }
})(BecomeTalent);