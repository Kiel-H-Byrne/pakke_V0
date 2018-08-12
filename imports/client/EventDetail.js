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

import Venues from '/imports/startup/collections/venues';
import PageError from './PageError';
import EventInterestModal from './forms/EventInterestModal'
import EventPurchaseModal from './forms/EventPurchaseModal'

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

  render() {
    const { classes } = this.props;
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
                <Paper elevation={0}>
                  <Typography variant="headline" align="center">Your Host:</Typography>
                  <img className='host-image' src={this.state.eventHost.profile.avatar} />
                  <Typography variant="title" align="center">{this.state.eventHost.profile.name}</Typography>
                </Paper> 
                ) : (
                  <div >
                  
                </div> 
                )
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
                      isExpired ? (
                        <Button disabled={true} fullWidth={true} variant="outlined" color="secondary">Sold Out!</Button>
                      ) : 
                      this.props.event.confirmedList.includes(this.props.thisUser._id) ? (
                       <Button onClick={boughtAlert} disabled={true} fullWidth={true} variant="outlined" color="secondary">Purchased!</Button>
                      ) : this.props.event.invitedList.includes(this.props.thisUser._id) ? ( 
                      //IF YOU'VE BEEN INVITED, PLEASE BUY A TICKET
                      <EventPurchaseModal  user = {this.props.thisUser} event = {this.props.event}/>
                      ) : this.props.event.appliedList.includes(this.props.thisUser._id) ? (
                        <Button onClick={waitAlert} fullWidth={true}>Applied!</Button>
                      ) : this.props.event.isPrivate ? (
                      //IF THERE IS A WAITING LIST: "private", PLEASE APPLY FOR A TICKET.
                      <EventInterestModal user = {this.props.thisUser} event = {this.props.event}/>
                      ) : ( //OTHERWISE, BUY A TICKET TO ANY EVENT (2nd DEFAULT)
                      <EventPurchaseModal user = {this.props.thisUser} event = {this.props.event}/>
                      ) // OTHERWISE, LOGIN TO BUY A TICKET.
                    ) : <Button onClick={loginAlert} fullWidth={true} >Buy Ticket</Button> 
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


