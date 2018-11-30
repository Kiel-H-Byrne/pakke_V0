import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { BarLoader } from 'react-spinners';
import { Link } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

import Events from '../../startup/collections/events.js'
import Venues from '../../startup/collections/venues.js'
import AddVenueModal from '../forms/AddVenueModal.js'
import EditEventButton from '../forms/EditEventButton.js'
import EditVenueButton from '../forms/EditVenueButton.js'
import AdminEditButton from '../forms/AdminEditButton.js'
import PageError from '../PageError';


class AdminPanelComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.sendGuestList = this.sendGuestList.bind(this)
    if ( props.thisUser && Roles.userIsInRole(props.thisUser, ["admin"])) { this.state.isAdmin = true }
  }

  sendGuestList(id) {
    console.log("Calling getCL method with id " + id)
    if (confirm('Are you sure you want to send this e-mail?')) {
      Meteor.call('getCL', id, (err, res) => {
        if (err) {
          console.log(err) 
        } else {
          Bert.alert("GuestList Sent!", "pk-success", "growl-top-right");
        }
      })
    }


  }
  componentDidMount() {
    // console.log(this)
  }
  render() {
    if (!Roles.userIsInRole(this.props.thisUser, ["admin"])) {
      return (<PageError />)
    }

    return (
      <div>
        <section>
        <Typography variant="display2" align="center">Events</Typography>
        <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Guests</TableCell>
            <TableCell>Venue ID</TableCell>
            <TableCell>Host ID</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell>Send GuestList</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
        { (!this.props.loading) ? (
          this.props.events.map((event) => {
            return (
              <TableRow key={event._id}>
                <TableCell><Link to={`/event/${event._id}`}>"{event.byline}"</Link></TableCell>
                <TableCell>{event.date.toDateString()}</TableCell>
                <TableCell>{event.confirmedList.length}</TableCell>
                <TableCell>{event.venueId}</TableCell>
                <TableCell>{event.hostId}</TableCell>
                <TableCell><AdminEditButton event={event}/></TableCell>
                <TableCell><Button type="button" onClick={() => this.sendGuestList(event._id)}>Send GL </Button> </TableCell>
              </TableRow>
              )
            })) : <TableRow><TableCell variant="body"><BarLoader 
                      loading={this.props.loading} 
                      color='#2964ff'
                      width={-1}
                      height={17}
                    /></TableCell></TableRow>
        }
        </TableBody>
        </Table>
         </section>


<section>
        <Typography variant="display2" align="center">Venues</Typography>
        <AddVenueModal />
        <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Owner</TableCell>            
            <TableCell>Capacity</TableCell>
            <TableCell>Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
        { (!this.props.loading) ? (
          this.props.venues.map((venue) => {
            return (
              <TableRow key={venue._id}>
                <TableCell>"{venue.nickname}"-{venue._id}</TableCell>
                <TableCell>{venue.address}</TableCell>
                <TableCell>{venue.type}</TableCell>
                <TableCell>{venue.hostId}</TableCell>
                <TableCell>{venue.capacity}</TableCell>
                <TableCell><EditVenueButton venue={venue}/></TableCell>
              </TableRow>
              )
            })) : <TableRow><TableCell variant="body1"><BarLoader 
                      loading={this.props.loading} 
                      color='#2964ff'
                      width={-1}
                      height={17}
                    /></TableCell></TableRow>
        }
        </TableBody>
        </Table>
         </section>

      </div>
    );
  }
}

export default AdminPanel = withTracker(() => {
  const subscription = Meteor.subscribe('events_all') && Meteor.subscribe('venues_all');
  const loading = !subscription.ready();

  return {
    loading,
    events: Events.find({}, {
      sort: { date: 1 }
    }).fetch(),
    venues: Venues.find({}).fetch(),
    thisUser: Meteor.userId()
  }
})(AdminPanelComponent)