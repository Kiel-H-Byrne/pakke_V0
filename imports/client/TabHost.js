import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { BarLoader } from 'react-spinners';

import Button from '@material-ui/core/Button';

import AddEventModal from './forms/AddEventModal.js'

import Events from '../startup/collections/events';
import Event from './Event2';

class TabHostComponent extends Component {
  render() {
    const isHost = Roles.userIsInRole(Meteor.userId(), ["host"]);

    if (!this.props.ready) {
      return <BarLoader 
              loading={this.props.loading} 
              color='#2964ff'
              width={-1}
              height={10}
            />;
    }

    return (
      <div className='host-block' style={{margin: '1rem 0'}}>
        {!isHost ? (
            <h3>You are not currently Hosting.</h3>
          ) : (
            <div>
              <h3>Your PAKKEs:</h3>
              <div className="scroll-wrapper-x">
              {this.props.eventsFromCollection.map((event) => {
                return <Event event={event} key={event._id} />
              })}
            </div>
          </div>
          )
        }
      <Button component={Link} to="/addevent">Create A New Experience:</Button> 
      </div>
    )
  }
}

export default TabHost = withTracker(({user}) => {
  let eventsSub = Meteor.subscribe('events_hosted', user._id)

  return {
    ready: eventsSub.ready(),
    eventsFromCollection: Events.find({
      hostId: user._id
    }).fetch()
  };
})(TabHostComponent);