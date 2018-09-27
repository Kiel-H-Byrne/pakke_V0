import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { BarLoader } from 'react-spinners';

import AddTalentModal from './forms/AddTalentModal';

import TalentCard from './TalentCard';

class TabHostComponent extends Component {
    render() {
    let isTalent = Roles.userIsInRole(Meteor.userId(), ["talent"])

    if (!this.props.ready) {
      return <BarLoader 
              loading={this.props.loading} 
              color='#2964ff'
              width={-1}
              height={10}
            />;
    } else {
      return (
        
        <div className='host-block'>
        {!isTalent ? (
          <div>
            <h3>You do not have any talents listed!</h3>
            <AddTalentModal />
          </div>
          ) : (
          <div>
              {/* */}
              <div>
                <h3>Your Talents:</h3>
                <div>
                  {this.props.talents.map((talent) => (
                    <TalentCard talent={talent} key={talent.name}/>
                    ))
                  }

                </div>
                <h4>Add More:</h4>
                <AddTalentModal />
            </div>
          {/**/}
          </div>
          )
        }
        {this.props.events.length !== 0 ? (
            <div>
              <h3>Your Entertaining these PAKKEs:</h3>
              <div className="scroll-wrapper-x">
                {this.props.events.map((event) => {
                return <Events event={event} key={event._id} />
                })}
              </div>
              <div>
                
              </div>
            </div>
            ) : (
            <div>
              <h3>Not Entertaining Any PAKKEs Yet...</h3>
              <h4>Search <Link to='/events'>Events</Link> to showcase your talent.</h4>
            </div>
            )
          }
        </div>
      )
    }
  }
}


export default TabHost = withTracker(() => {
  let talentSub = Meteor.subscribe('talents_all');
  let eventsSub = Meteor.subscribe('events_entertained');
  let userSub = Meteor.subscribe('currentUser');
  return {
    ready: eventsSub.ready() && talentSub.ready() && userSub.ready(),
    events: Events.find({
      entertainers: { $in: [Meteor.userId()] }
    }).fetch(),
    talents: Talents.find({
      userId: Meteor.userId()
    }).fetch(),
  };
})(TabHostComponent);