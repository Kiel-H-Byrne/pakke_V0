import React, { Component } from 'react'
import FormBecomeTalent from '../FormBecomeTalent';
import { createContainer } from 'meteor/react-meteor-data';


class BecomeTalent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const loginAlert = () => Bert.alert("Please Log In First.", "warning", "growl-top-right");
    return (
      <div className="container">
        <img src='Talent.jpg' />
        <div className='container-text-talent'>
          <h1>Share Your Talent</h1>
          <h2>Show us what you got</h2>
          <h3>peform at new venues around the city and make extra cash</h3>
          <p>click the button below to register your tallent with Pakke</p>
        </div>
        {this.props.authenticated ? (
          <>
          <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Register Your Talent</button>
          <div className="modal fade" id="myModal" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                  <h4 className="modal-title">Talent Sign Up Form</h4>
                </div>
                <div className="modal-body">
                  <FormBecomeTalent />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
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

export default createContainer(() => {
  return {
    authenticated: Meteor.userId()
  }
}, BecomeTalent);