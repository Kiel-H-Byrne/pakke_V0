import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import Events from '../startup/collections/events';
import EventInterestForm from './forms/EventInterestForm'
import EventPurchaseForm from './forms/EventPurchaseForm'
import { BarLoader } from 'react-spinners';


class EventDetails extends Component {
  state = {
    event: {},
    eventHost: {},
  }

  // applyStatus(props) {
  //   // logged in and not applied = member
  //   console.log(props);
  //   if (Meteor.userId()) { 
  //     if (this.props.event.guests.confirmed.includes(Meteor.userId())) {return "confirmed";}
  //     else if (props.event.guests.invited.includes(Meteor.userId())) {return "invited";}
  //     else if (props.event.guests.applied.includes(Meteor.userId())) {return "applied";}
  //     else return "member"
  //   } else {
  //     return "visitor"
  //   }
  //   // applied and waiting = applied
  //   // on final guestlist, unpaid = invited
  //   // paid = confirmed
  // }
  // attendEvent() {
  //   // console.log('submit attendee')
  //   const eventId = this.state.event._id;

  //   const thisUserId = Meteor.userId();
  //   Meteor.call("attendEvent", thisUserId, eventId);

  //   Bert.alert("Your are attending this event", "success", "growl-top-right");
  // }

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log(nextProps, prevState)
    let eventHost;
    nextProps.event ? eventHost = Meteor.users.findOne(nextProps.event.hostId) : null
    return {
      event: Events.findOne(nextProps.match.params.id),
      eventHost: eventHost
    };
  }

  componentWillUnmount() {
    this.props.handle.stop();
  }

  render() {
    
    const loginAlert = () => Bert.alert("Please Log In First.", "warning", "growl-top-right");
    // const status = () => {
    //   if (Meteor.userId() && !loading) { 
    //     if (event.guests.confirmed.includes(Meteor.userId())) { status = "confirmed";
    //     } else if (event.guests.invited.includes(Meteor.userId())) { status = "invited";
    //     } else if (event.guests.applied.includes(Meteor.userId())) { status = "applied";
    //     } else { status = "member" }
    //   }
    // }
    if (this.props.loading) {
      return (
        <div>
          <BarLoader 
              style={{'width':'100%'}}
              color={'#123abc'} 
              loading={this.props.loading} 
            />
        </div>
      )
    }
  // console.log(this.state);
    return (
      <div>
        <img className='event-detail-image' src={this.state.event.image} alt='image' />
        <h1>{this.props.event.byline}</h1>
        <p>{this.props.event.description}</p>

        <div className='event-detail-bottom'>

          <div className='host-info'>
            <img className='host-image' src='/missing_profile.png' />
            <h3>Host Name</h3>
            {/* <h3>{this.state.event.host.email}</h3> */}
          </div>


          <div className='attend-event-button-area'>
            <div className='attend-event-button'>
            <p>{this.props.event.price ? `$ ${this.props.event.price}` : 'Sold Out'}</p>
              { 
                // this.props.event.invitedList.includes(Meteor.userId()) ? ( 
                // <div>
                // <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#eventPurchaseModal">Buy Tickets</button>
                //   <div className="modal fade" id="eventPurchaseModal" role="dialog">
                //     <div className="modal-dialog">
                //       <div className="modal-content">
                //         <div className="modal-header">
                //           <button type="button" className="close" data-dismiss="modal">&times;</button>
                //           <h4 className="modal-title">Buy Tickets</h4>
                //         </div>
                //         <div className="modal-body">
                //           <EventPurchaseForm />
                //         </div>
                //       </div>
                //     </div>
                //   </div>
                //   </div>
                // ) : 
    this.props.event.appliedList.includes(Meteor.userId()) ? (
                  <button disabled className="btn btn-success btn-lg" >Apply</button>
                ) : Meteor.userId() ? (
                <div>
                <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#eventInterestsModal">Apply</button>
                  <div className="modal fade" id="eventInterestsModal" role="dialog">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <button type="button" className="close" data-dismiss="modal">&times;</button>
                          <h4 className="modal-title">Interest Form</h4>
                        </div>
                        <div className="modal-body">
                          <p>Please answer some questions to help us find you the perfect party experience: </p>
                          <EventInterestForm user = {this.props.thisUser} eventId = {this.props.event._id}/>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                ) : (
                <button onClick={loginAlert} className="btn btn-success btn-lg" >Apply</button>
              )}
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default withTracker(({ match }) => {
  const handle = Meteor.subscribe('event', match.params.id);
  const loading = !handle.ready(); 
  const event = Events.findOne( match.params.id );
  const thisUser = Meteor.user();

  // if (Meteor.userId() && !loading) { 
  //   if (event.guests.confirmed.includes(Meteor.userId())) { status = "confirmed";
  //   } else if (event.guests.invited.includes(Meteor.userId())) { status = "invited";
  //   } else if (event.guests.applied.includes(Meteor.userId())) { status = "applied";
  //   } else { status = "member" }
  // }
  return {
    handle,
    loading,
    event,
    thisUser
  }
})(EventDetails);


