import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Events from '../startup/collections/events';
import { BarLoader } from 'react-spinners';

import EventInterestForm from './forms/EventInterestForm'
import EventPurchaseForm from './forms/EventPurchaseForm'

class EventDetails extends Component {
  constructor(props) {
    super(props)
    // state.thisUser = Meteor.user
    this.state = {
      thisUser: {},
      event: {},
      host: {},
    }
  }


  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(nextProps, prevState)
  //   let host;
  //   // console.log(nextProps.event);
  //   nextProps.event ? host = Meteor.users.findOne(nextProps.event.hostId) : host = {};
  //     // console.log(host);
    
    return {
      // event: Events.findOne(nextProps.match.params.id),
      // host: host
    };
  }

  componentWillUnmount() {
    this.props.handle.stop();
  }

  render() {
    
    const loginAlert = () => Bert.alert("Please Log In First.", "info", "growl-top-right");
    const waitAlert = () => Bert.alert("Please Check Your E-mail.", "info", "growl-top-right");
    const boughtAlert = () => Bert.alert("See you Soon!", "info", "growl-top-right");

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
        <img className='event-detail-image' src={this.props.event.image} alt='image' />
        <h1>{this.props.event.byline}</h1>
        <p>{this.props.event.description}</p>

        <div className='event-detail-bottom'>

          <div className='host-info'>
          <h3>Host Info</h3>
            { this.state.host ? <img className='host-image' src={this.state.host} /> : <img className='host-image' src='/missing_profile.png' /> }
            
            { this.state.host ? (<h3>{this.state.host.username}</h3>) : (<h3>Host Name</h3>) }
          </div>


          <div className='attend-event-button-area'>
            <div className='attend-event-button'>
            <p>{this.props.event.price ? `$ ${this.props.event.price}` : 'Sold Out'}</p>
              { 
                this.state.thisUser && this.props.event.confirmedList.includes(this.state.thisUser._id) ? ( 
                  <button onClick={boughtAlert} className="btn disabled btn-success btn-lg" >Purchased!</button>
                ) : this.state.thisUser && this.props.event.invitedList.includes(this.state.thisUser._id) ? ( 
                <div>
                <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#eventPurchaseModal">Buy Tickets</button>
                  <div className="modal fade" id="eventPurchaseModal" role="dialog">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <button type="button" className="close" data-dismiss="modal">&times;</button>
                          <h4 className="modal-title">Buy Tickets</h4>
                        </div>
                        <div className="modal-body">
                          <EventPurchaseForm user = {this.state.thisUser} event = {this.props.event}  />
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                ) : this.props.event.appliedList.includes(Meteor.userId()) ? (
                  <button onClick={waitAlert} className="btn disabled btn-success btn-lg" >Applied!</button>
                ) : this.state.thisUser ? (
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
                          <EventInterestForm user = {this.state.thisUser} event = {this.props.event}/>
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
  let handle = Meteor.subscribe('event', match.params.id);
  let loading = !handle.ready(); 
  let event = Events.findOne( match.params.id );
  let host
  event ? host = Meteor.users.findOne(event.hostId) : null;
console.log(loading,event, host);
  return {
    handle,
    loading,
    event
  }
})(EventDetails);


