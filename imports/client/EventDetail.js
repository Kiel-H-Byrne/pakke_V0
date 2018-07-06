import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Events from '../startup/collections/events';
import { BarLoader } from 'react-spinners';
import {Helmet} from "react-helmet";

import Button from '@material-ui/core/Button';
import EventInterestModal from './forms/EventInterestModal'
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
        <Helmet>
          <title>PAKKE Event: {this.props.event.byline}</title>
          <meta name="description" content={this.props.event.description}/>
          <meta name="keywords" content="Night Life, Nightlife, Night Out, Social Events, Parties in DC, Events in DC "+ {this.props.event.description} />

          <meta property="og:title" content={this.props.event.byline} />
          <meta property="og:type" content="website" />
          <meta property="og:image" content={this.props.event.image} />
          <meta property="og:image:secure_url" content={this.props.event.image} />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content="529" />
          <meta property="og:image:height" content="529" />
          <meta property="og:image:alt" content={this.props.event.byline} />
          <meta property="og:url" content="https://www.pakke.us/event/"+{this.props.event._id} />
          <meta property="og:description" content={this.props.event.description}/>
          <meta property="og:determiner" content="auto" />
          <meta property="og:locale" content="en_US" />
          <meta property="og:site_name" content="PAKKE" />
          <meta property="fb:app_id" content="168356840569104" />
          
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={this.props.event.byline} />
          <meta name="twitter:description" content={this.props.event.description} />
          <meta name="twitter:url" content="https://www.pakke.us/event/"+{this.props.event._id}  />
          <meta name="twitter:image" content={this.props.event.image} />
        </Helmet>

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
            <div> 
              <a href={this.props.event.partnerLink} target="_blank" className="btn btn-info btn-lg"> Apply </a>
           </div>
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
                    //IF THERE IS A WAITING LIST: "private", PLEASE APPLY FOR A TICKET.
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

export default EventDetails = withTracker(({ match }) => {

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
})(EventDetailsComponent);


