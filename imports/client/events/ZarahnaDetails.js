import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Events from '../startup/collections/events';
import { BarLoader } from 'react-spinners';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import EventInterestModal from './forms/EventInterestModal'
import EventPurchaseModal from './forms/EventPurchaseModal'

class ZarahnaDetailsComponent extends Component {
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
    
    const loginAlert = () => Bert.alert("Please Log In First.", "info", "growl-top-right");
    const waitAlert = () => Bert.alert("Please Check Your E-mail.", "info", "growl-top-right");
    const boughtAlert = () => Bert.alert("See you Soon!", "info", "growl-top-right");

    if (this.props.loading) {

      return (
        <div>
          <BarLoader 
              loading={this.props.loading} 
              color='#2964ff'
              width={-1}
              height={10}
            />
        </div>
      )
    }
  // console.log(this.state);

    return (
      <div className='event-detail-container'>
        <img className='event-detail-image' src={this.props.event.image ? this.props.event.image : `""`} alt='Event Preview' />
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

          {this.props.event.partner ? (
              <Button component={Link} to={this.props.event.partnerLink}  > Apply </Button>
            ) : (
            <div className='attend-event-button-area'>
              <div className='attend-event-button'>
              <p>${this.props.event.price}</p>
                {this.props.thisUser ? (
                    this.props.event.confirmedList.includes(this.props.thisUser._id) ? (
                    
                      <Button onClick={boughtAlert} disabled variant="outlined" color="secondary">Purchased!</Button>
                    ) : this.props.event.invitedList.includes(this.props.thisUser._id) ? ( 
                    //IF YOU'VE BEEN INVITED, PLEASE BUY A TICKET
                    <EventPurchaseModal  user = {this.props.thisUser} event = {this.props.event}/>
                    ) : this.props.event.appliedList.includes(this.props.thisUser._id) ? (
                      <Button onClick={waitAlert} >Applied!</Button>
                    ) : this.props.event.isPrivate ? (
                    //IF THERE IS A WAITING LIST ("private") PLEASE APPLY FOR A TICKET.
                    <EventInterestModal user = {this.props.thisUser} event = {this.props.event}/>
                    ) : ( //OTHERWISE, BUY A TICKET TO ANY EVENT (2nd DEFAULT)
                    <EventPurchaseModal user = {this.props.thisUser} event = {this.props.event}/>
                    ) // OTHERWISE, LOGIN TO BUY A TICKET.
                  ) : <Button onClick={loginAlert} >Buy Ticket</Button> 
                }
              </div>
            </div>
          )}
        </div>
      </div>

    )
  }
}

export default ZarahnaDetails = withTracker(({ match }) => {

  let handle = Meteor.subscribe('events_all') && Meteor.subscribe('eventHost', match.params.id) && Meteor.subscribe('currentUser', Meteor.userId());
  let loading = !handle.ready(); 
  const event = Events.findOne( match.params.id );
  const thisUser = Meteor.users.findOne(Meteor.userId());
  
  return {
    handle,
    loading,
    event, 
    thisUser
  }
})(ZarahnaDetailsComponent);


