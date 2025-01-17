import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Events from '../startup/collections/events';
import { BarLoader } from 'react-spinners';

import EventInterestForm from './forms/EventInterestForm'
import EventPurchaseModal from './forms/EventPurchaseModal'

class EventDetailsComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      eventHost: {},
      soldOut: false
    }
  }


  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log(nextProps, prevState)
    let eventHost;
    nextProps.event ? eventHost = Meteor.users.findOne(nextProps.event.hostId) : null
    return {
      eventHost: eventHost
    };
  }

  componentWillUnmount() {
    this.props.handle.stop();
  }

  render() {
    
    const loginAlert = () => {
      // scrollToTop();   
      window.scrollTo({top: 0, behavior: "smooth"});
      Bert.alert({
        message: "Please Log In First.", 
        type: "login-alert",
        style: "growl-top-left",
        icon: 'fa-sign-in'
      });
    }

    if (this.props.loading) {
      return (
          <BarLoader 
              loading={this.props.loading} 
              color='#2964ff'
              width={-1}
              height={10}
            />
      )
    }
  // console.log(this.state);

    return (
      <div className='event-detail-container'>
        <img className='event-detail-image' src={this.props.event.image} alt='image' />
        <h1>{this.props.event.byline}</h1>
        <p className="lead">{this.props.event.description}</p>

        <div className='event-detail-bottom'>
          {this.state.eventHost ? (
            <div className='host-info'>
              <h3>Your Host:</h3>
              <img className='host-image' src={this.state.eventHost.profile.avatar} />
              <h4>{this.state.eventHost.profile.name}</h4>
            </div> 
            ) : (
              <div className='host-info'>
              
            </div> 
            )
          }


          <div className='attend-event-button-area'>
            <div className='attend-event-button'>
            <p>${this.props.event.price}</p>
            {this.props.thisUser ? (
                this.props.event.confirmedList.includes(this.props.thisUser._id) ? (
                
                  <button onClick={boughtAlert} className="btn disabled btn-success btn-lg" >Purchased!</button>
                ) : this.props.event.invitedList.includes(this.props.thisUser._id) ? ( 
                
                <EventPurchaseModal  user = {this.props.thisUser} event = {this.props.event}/>
                ) : this.props.event.appliedList.includes(this.props.thisUser._id) ? (
              
                  <button onClick={waitAlert} className="btn disabled btn-success btn-lg" >Applied!</button>
                ) : (
              
                <div>
                <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#eventInterestsModal">Apply</button>
                  <div className="modal fade" id="eventInterestsModal" role="dialog">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <button type="button" className="close" data-dismiss="modal">&times;</button>
                          <h4 className="modal-title">Tell us a bit about yourself!</h4>
                        </div>
                        <div className="modal-body">
                          <p><em>A few questions will help us find you the perfect party experience!</em> </p>
                          <EventInterestForm user = {this.props.thisUser} event = {this.props.event}/>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                ) ) : <button onClick={loginAlert} className="btn btn-success btn-lg" >Apply</button> }
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default EventDetails = withTracker(({ match }) => {
  let handle = Meteor.subscribe('affiliate_event', match.params.id);
  let loading = !handle.ready(); 
  let event = AffiliateEvents.findOne( match.params.id );
  
  return {
    handle,
    loading,
    event, 
    thisUser: Meteor.user()
  }
})(EventDetailsComponent);


