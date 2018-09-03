import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withStyles } from '@material-ui/core/styles';
import Events from '../startup/collections/events';
import { BarLoader } from 'react-spinners';
import {Helmet} from "react-helmet";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';

import Button from '@material-ui/core/Button';

import Venues from '/imports/startup/collections/venues.js';
import PageError from './PageError.js';
import EventMap from './EventMap.js'
import EventInterestModal from './forms/EventInterestModal.js'
import EventPurchaseModal from './forms/EventPurchaseModal.js'

import eventPurchasedTemplate from './email/eventPurchasedTemplate';
import eventPurchasedAdminTemplate from './email/eventPurchasedAdminTemplate';

const styles = {
  grid: {
    flexGrow: 1,
  },
  container: {
    maxWidth: 960,
    margin: 'auto',
  },
  table: {
    fontSize: 16,
    border: 'none',
    maxWidth: '20rem'
  },
  image: {
    height: 0,
    paddingTop: '56.25%'
  },
  cell: {
    fontSize: 14
  }
}

let intervalId = 0; 
function scrollStep() {
    // Check if we're at the top already. If so, stop scrolling by clearing the interval
    if (window.pageYOffset === 0) {
        clearInterval(intervalId);
    }
    window.scroll(0, window.pageYOffset - 50);
}
function scrollToTop() {
    // Call the function scrollStep() every 16.66 millisecons
    intervalId = setInterval(scrollStep, 16.66);
}

const loginAlert = () => {
  scrollToTop();   
  // window.scrollTo({top: 0, behavior: "smooth"});
  Bert.alert({
    message: "Please Log In First.", 
    type: "login-alert",
    style: "growl-top-left",
    icon: 'fa-sign-in'
  });
}
const waitAlert = () => Bert.alert("Please Check Your E-mail.", "info", "growl-top-right");

class EventDetailsComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      eventHost: {},
      soldOut: false
    }
  }
  
  static getDerivedStateFromProps(nextProps, prevState) {
    let eventHost, venue;
    if (nextProps.event) {
      eventHost = Meteor.users.findOne(nextProps.event.hostId)
      if (nextProps.event.venueId) {
        // venue = eventHost.profile.venues.filter((v) => (v.venueId === nextProps.event.venueId))
        venue = Venues.find({ events: { $in: [nextProps.event._id] } }).fetch();
        // console.log(venue)
      }
      return {
        eventHost: eventHost,
        venue: venue
      };
    } else return null
  }
  componentWillmount() {
    Meteor.subscribe('event_venue', this.props.event._id)
  }
  componentWillUnmount() {
    this.props.handle.stop();
  }
  handleAddGuest = () => {
    const user = this.props.thisUser;
    const event = this.props.event;
    const userEmail = user.emails[0].address;
    const userEmailProps = [
      "noreply@pakke.us",
      "Ticket Purchase Confirmation",
      eventPurchasedTemplate(user, event)
    ];
    
    const adminEmailProps = [
      "noreply@pakke.us",
      "EVENTS: Ticket Purchase",
      eventPurchasedAdminTemplate(user, event)
    ];

    Bert.alert(`Yay! Check your inbox [${userEmail}] for more info!`, "success");
    Meteor.call('amConfirmed', event._id);
    if (Meteor.isProduction) {
      Meteor.call('sendEmail', userEmail, ...userEmailProps);
      Meteor.call('sendEmail', "info@pakke.us", ...adminEmailProps);

      analytics.track("Joined GuestList", {
        label: event.byline,
        commerce: event.price,
        value: event.price,
        host: event.hostId,
      })

    } else {
      // console.log(token);
      console.log('emails wouldve been sent if not for development')
    }
  }
  render() {
    const { classes } = this.props;

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
    if (!this.props.event) {
      return <PageError />
    }

    const one_day=1000*60*60*24;
    const realEventDate = new Date((this.props.event.date * 1) + ((new Date().getTimezoneOffset())*60*1000))
    // const isExpired = (((realEventDate.getTime() - Date.now())/one_day) <= -1) //EVENT DATE IS YESTERDAY (ALLOW TO BUY UP TO DAY AFTER)
    const isExpired = (realEventDate.getTime() < Date.now()) //EVENT DATE & Time is a milLisecond BEFORE CURRENT TIME (ALLOW TO BUY UP TO EVENT TIME)
    const isTBD = (((realEventDate.getTime() - Date.now())/one_day) > 364) //DATE IS A YEAR AHEAD 

    return (
      <div>
        <Helmet>
          <title>PAKKE Event: {this.props.event.byline}</title>
          <meta http-equiv="CACHE-CONTROL" content="NO-CACHE" />  
          <meta http-equiv="PRAGMA" content="NO-CACHE" /> 
          <meta name="description" content={this.props.event.description}/>
          <meta name="keywords" content={`${this.props.event.description}`}/>
          <meta property="og:title" content={this.props.event.byline} />
          <meta property="og:image" content={this.props.event.image} />
          <meta property="og:image:secure_url" content={this.props.event.image} />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content="529" />
          <meta property="og:image:height" content="529" />
          <meta property="og:image:alt" content={this.props.event.byline} />
          <meta property="og:url" content={`https://www.pakke.us/event/${this.props.event._id}`} />
          <meta property="og:description" content={this.props.event.description}/>
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={this.props.event.byline} />
          <meta name="twitter:description" content={this.props.event.description} />
          <meta name="twitter:url" content={`https://www.pakke.us/event/${this.props.event._id}`}  />
          <meta name="twitter:image" content={this.props.event.image} />
        </Helmet>
        <Card className={classes.container}>
          <CardMedia image={this.props.event.image ? this.props.event.image : `""`} title='Event Preview' className={classes.image} />
          <CardContent>
            <Typography variant="display1" align="center" gutterBottom >{this.props.event.byline}</Typography>
            <Typography dangerouslySetInnerHTML={{__html: this.props.event.description}} />
            <Grid 
            container
            alignItems="center"
            direction="row"
            justify="center"
            className={classes.grid}
            >

              <Grid item>
              {this.state.eventHost ? (
                <React.Fragment>
                <Paper elevation={0}>
                  <Typography variant="headline" align="center">Your Host:</Typography>
                  <img className='host-image' src={this.state.eventHost.profile.avatar} />
                  <Typography variant="title" align="center">{this.state.eventHost.profile.name}</Typography>
                </Paper> 
                <div className="fb-share-button" 
                      data-href={`https://www.pakke.us/event/${this.props.event._id}`} 
                      data-layout="button_count"
                      data-size="large">
                    </div>
                    </React.Fragment>
                ) : ( '' )
              }
              </Grid>
              <Grid item>
              {this.props.event.partner ? (
                <div> 
                  <Button component={Link} to={this.props.event.partnerLink} target="_blank" className="btn btn-info btn-lg"> Apply </Button>
               </div>
                ) : (
                <div>
                  <Table>
                    <TableBody className={classes.table}>
                      <TableRow>
                        <TableCell className={classes.cell}><h5>WHEN:</h5> </TableCell>
                        <TableCell numeric={true} className={classes.cell}>{realEventDate.toDateString().substring(0, (realEventDate.toDateString()).length - 5)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.cell}><h5>PRICE:</h5> </TableCell>
                        <TableCell  numeric={true} className={classes.cell}>${this.props.event.price}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  {this.props.thisUser ? (

                    //OLD EVENT, DISABLE BUTTON
                      isExpired ? (
                        <Button disabled={true} fullWidth={true} variant="outlined" color="secondary">Sold Out!</Button>
                      ) : this.props.event.confirmedList.includes(this.props.thisUser._id) ? (
                      //USER HAS PURCHASD A TICKET: BELLS & WHISTLES
                      //GET DATE, GET MAP, DISABLE BUTTON, SHOW AS PURCHASED, OUTLINE?
                      <React.Fragment>
                       {/*
                      <TableRow>
                        <TableCell className={classes.cell}><h5>WHERE:</h5> </TableCell>
                        <TableCell  numeric={true} className={classes.cell}>Nowhere</TableCell> 
                      </TableRow>
                    */}
                        <Paper>
                          <EventMap venueId={this.props.event.venueId} event={this.props.event} />
                        </Paper>
                        <Button disabled={true} fullWidth={true} variant="outlined">Attending!</Button>
                      </React.Fragment>

                      ) : this.props.event.invitedList.includes(this.props.thisUser._id) ? ( 
                      //IF YOU'VE BEEN INVITED, PLEASE BUY A TICKET
                      <EventPurchaseModal  user = {this.props.thisUser} event = {this.props.event}/>
                      ) : this.props.event.appliedList.includes(this.props.thisUser._id) ? (
                      //YOU'VE APPLIED FOR THE PARTY, CHECK EMAIL AND WAIT TO GET ADDED TO INVITED LIST
                        <Button onClick={waitAlert} fullWidth={true}>Applied!</Button>
                      ) : this.props.event.isPrivate ? (
                      //IF THERE IS A WAITING LIST: (private), PLEASE APPLY FOR A TICKET.
                      <EventInterestModal user = {this.props.thisUser} event = {this.props.event}/>
                      ) : this.props.event.price == 0 ? (
                      // IF PRICE IS 0 , DONATE? AND ADD TO TO LIST FOR PARTY.
                      <Button onClick={() => {this.handleAddGuest()}} fullWidth={true} >Join Guestlist</Button> 
                      ) : ( 
                      //OTHERWISE, OPEN PARTY, BUY A TICKET
                      <EventPurchaseModal user = {this.props.thisUser} event = {this.props.event}/>
                      ) 
                    ) : (
                    // OTHERWISE, JUST LANDED, LOG IN TO BUY A TICKET.
                    <Button onClick={loginAlert} fullWidth={true} >Buy Ticket</Button> 
                    )
                  }
                    
                  </div>
                  
              )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    )
  }
}

export default EventDetails = withTracker(({ match }) => {

  let handle = Meteor.subscribe('event', match.params.id) && Meteor.subscribe('eventHost', match.params.id) && Meteor.subscribe('currentUser', Meteor.userId());
  let loading = !handle.ready(); 
  const event = Events.findOne( match.params.id );
  const thisUser = Meteor.users.findOne(Meteor.userId());
 
  return {
    handle,
    loading,
    event, 
    thisUser
  }
})(withStyles(styles)(EventDetailsComponent));


