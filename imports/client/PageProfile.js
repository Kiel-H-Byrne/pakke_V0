import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Route, Link, Switch, Redirect } from 'react-router-dom';

import EventForm from './forms/EventForm';
import Events from '../startup/collections/events';
import Event from './Event';
import TabGuest from './TabGuest';
import TabHost from './TabHost';
import TabTalent from './TabTalent';



class PageProfile extends Component {

  render() {

    if (!this.props.ready) {
      return <div>Loading</div>;
    } else if (!this.props.currentUser) {
      return <Redirect to="/" />;
    }

    else {

      return (
        <div>

          <div className='profile-head'>
            <div className='profile-head-image'>
              {Meteor.user().profile.avatar ? (
                <img data-toggle="dropdown" className="icon dropdown-toggle" src={Meteor.user().profile.avatar} />
              ) : (
                  <img data-toggle="dropdown" className="icon dropdown-toggle" src='/missing_profile.png' />
                )}
            </div>
            <div className='profile-head-text'>
              {(this.props.currentUser.username) ? (
                <h4>I'm {this.props.currentUser.username}</h4>
              ) : (
                  <h4> I'm a new user </h4>
                )
              }
              <button className='btn btn-info btn-sm center-block'>Edit Profile</button>
            </div>
          </div>




          <ul className="nav nav-tabs">
            <li className="active"><a data-toggle="tab" href="#home">Guest</a></li>
            <li><a data-toggle="tab" href="#menu1">Host</a></li>
            <li><a data-toggle="tab" href="#menu2">Talent</a></li>
          </ul>

          <div className="tab-content">
            <div id="home" className="tab-pane fade in active">
              <TabGuest />
            </div>
            <div id="menu1" className="tab-pane fade">
              <TabHost />
            </div>
            <div id="menu2" className="tab-pane fade">
              <TabTalent />
            </div>
          </div>
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
      attendees: { $in: [Meteor.userId()] }
    }).fetch(),
  };
})(PageProfile);