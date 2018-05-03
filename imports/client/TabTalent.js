import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';

import AddTalentForm from './forms/AddTalentForm';
import Events from '../startup/collections/events';
import Event from './Event';

class TabHost extends Component {
    render() {
      const isTalent = Roles.userIsInRole(Meteor.userId(), ["talent"])

    if (!this.props.ready) {
      return <div>Loading</div>;
    } else {

      return (
        
        <div className='host-block'>
        {!isTalent ? (
          <div>
          <h3>You do not have any talents listed!</h3>
          <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#talentProfileModal">Entertain a Pakke</button>
            <div className="modal fade" id="talentProfileModal" role="dialog">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                    <h4 className="modal-title">Talent Form</h4>
                  </div>
                  <div className="modal-body">
                    <AddTalentForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
          ) : (
          <div>
            <h3>Your Entertaining these Pakkes:</h3>
            <div className="scroll-wrapper-x">
              {this.props.eventsFromCollection.map((event) => {
              return <Event event={event} key={event._id} />
              })}
            </div>
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
          </div>
          )
        }
        </div>
      )
    }
  }
}


export default withTracker(() => {
  let eventsSub = Meteor.subscribe('events_current');
  let userSub = Meteor.subscribe('currentUser');
  return {
    ready: eventsSub.ready() && userSub.ready(),
    currentUserId: Meteor.userId(),
    currentUser: Meteor.user(),
    allEvents: Events.find({}, {}).fetch(),
    eventsFromCollection: Events.find({
      entertainers: { $in: [Meteor.userId()] }
    }).fetch(),
  };
})(TabHost);