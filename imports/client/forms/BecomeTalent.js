import React from 'react'
import FormBecomeTalent from '../FormBecomeTalent';

const isLoggedIn = Meteor.userId();
const BecomeTalent = () => (

  <div className="container">
    <img src='Talent.jpg' />

    <h1>Share Your Talent</h1>
    <h2>Do you have a talent?</h2>
    <h3>peform at venues across the city</h3>
    <p>Lorem ipsum dolor amet schlitz letterpress gentrify squid migas glossier</p>
    {isLoggedIn ? (
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
      <>
      <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#loginModal">Register Your Talent</button>
      <div className="modal fade" id="loginModal" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              <h4 className="modal-title">Log In</h4>
            </div>
            <div className="modal-body">
              
            </div>
          </div>

        </div>
      </div>
      </>
      )
    }
  </div>



);

export default BecomeTalent;