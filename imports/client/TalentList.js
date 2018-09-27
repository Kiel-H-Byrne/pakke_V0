import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session'
import { GridLoader } from 'react-spinners';

import TalentCard from './TalentCard';

import Talents from '/imports/startup/collections/talents';

class TalentListComponent extends Component {
  constructor(props) {
        super(props)
        this.state = {
          eventHost: {},
          soldOut: false
        }
    }
  render() {
    return (
        this.props.talents.map((talent) => {
          if (!this.props.ready) {
            return (
                <GridLoader 
                key={event._id}
                loading={!this.props.ready} 
                color='#2964ff'
                size={20}
                margin='1rem' />
                )
          } else {
            return <TalentCard key={talent._id} talent={talent} />
          }
        })
      )
    }
  };


export default TalentList = withTracker(() => {
  let talentsSub = Meteor.subscribe('talents_all');

  return {
    ready: talentsSub.ready(),
    talents: Talents.find(
    // {
    //   date: {
    //       $gte: new Date() 
    //     },
    //   $or: [
    //     {"featured": false},
    //     {"isPrivate": false}]
    //   }, {
    //   sort: { date: 1 }
    
    ).fetch()
  }
})(TalentListComponent);
