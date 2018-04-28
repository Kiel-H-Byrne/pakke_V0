import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import Events from '../startup/collections/events';
import EventInterestForm from './forms/EventInterestForm'
import EventPurchaseForm from './forms/EventPurchaseForm'


class EventDetails extends Component {
  state = {
    event: {}
  }

  applyStatus() {
    // logged in and not applied = member
    console.log(props.event);
    if (Meteor.userId()) { 
      if (props.event.guests.confirmed.includes(Meteor.userId())) {return "confirmed";}
      else if (props.event.guests.invited.includes(Meteor.userId())) {return "invited";}
      else if (props.event.guests.applied.includes(Meteor.userId())) {return "applied";}
      else return "member"
    } else {
      return "visitor"
    }
    // applied and waiting = applied
    // on final guestlist, unpaid = invited
    // paid = confirmed
  }
  // attendEvent() {
  //   // console.log('submit attendee')
  //   const eventId = this.state.event._id;

  //   const thisUserId = Meteor.userId();
  //   Meteor.call("attendEvent", thisUserId, eventId);

  //   Bert.alert("Your are attending this event", "success", "growl-top-right");
  // }

  componentWillMount() {
    console.log(this);
    this.setState({
      event: Events.findOne(this.props.match.params.id)
    });
  }

  componentWillUnmount() {
    console.log(this)
    this.props.eventHandle.stop();
  }

  shouldComponentUpdate(props, state){
    console.log(props, state);
    return !(props.event === state.event)
  };


  render() {
    const loginAlert = () => Bert.alert("Please Log In First.", "warning", "growl-top-right");
    return (
        this.props.event ? ( 
      <div>
        <img className='event-detail-image' src={this.props.event.image} alt='image' />
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
            <p>{this.props.price ? `$ ${this.props.price}` : 'Sold Out'}</p>
              {this.applyStatus = "member" ? (
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
                          <EventInterestForm />
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                ) : this.applyStatus = "invited" ? ( 
                <div>
                <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#eventPurchaseModal">Apply</button>
                  <div className="modal fade" id="eventPurchaseModal" role="dialog">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <button type="button" className="close" data-dismiss="modal">&times;</button>
                          <h4 className="modal-title">Buy Tickets</h4>
                        </div>
                        <div className="modal-body">
                          <EventPurchaseForm />
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
      ) : (
      <div>loading...</div>)
    )
  }
}

export default withTracker(({ match }) => {
  const eventHandle = Meteor.subscribe('event', match.params.id);
  const loading = !eventHandle.ready(); 
  const event = Events.findOne( match.params.id );
    return {
      eventHandle,
      loading,
      event,
    }
})(EventDetails);


