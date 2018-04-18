import React, { Component } from 'react'
import EditProfileTalentForm from './FormEditProfileTalent';
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

        <h1>Share Your Talent</h1>
        <h2>Do you have a talent?</h2>
        <h3>peform at venues across the city</h3>
        <p>Lorem ipsum dolor amet schlitz letterpress gentrify squid migas glossier</p>
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
                    <EditProfileTalentForm />
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