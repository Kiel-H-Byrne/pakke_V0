import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import EventList from './EventList';
import PageLanding2 from './UI/PageLanding2';
import PageProfile from './PageProfile';


class Home extends Component {

  render() {
    
      return (
      <PageLanding2 />

    )
  }
}


export default withTracker(() => {
  return {
    currentUser: Meteor.user(),
  };
})(Home);