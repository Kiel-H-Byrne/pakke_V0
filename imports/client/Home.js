import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import EventList from './EventList';
import LandingPage from './LandingPage';


class Home extends Component {

  render() {
    // if (this.props.currentUser) {
    //   return (
    //     <EventList />
    //   )
    // } else {
      return (
      <LandingPage />

    )
    // }
  }
}

export default withTracker(() => {
  return {
    currentUser: Meteor.user(),
  };
})(Home);