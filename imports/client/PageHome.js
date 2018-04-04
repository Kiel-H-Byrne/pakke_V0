import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import EventList from './EventList';
import PageLanding from './PageLanding';
import PageProfile from './PageProfile';


class Home extends Component {

  render() {
    if (this.props.currentUser) {
      return (
        <PageProfile />
      )
    } else {
      return (
      <PageLanding />

    )
    }
  }
}

export default withTracker(() => {
  return {
    currentUser: Meteor.user(),
  };
})(Home);