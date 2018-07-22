import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { BarLoader } from 'react-spinners';

import Button from '@material-ui/core/Button';

import EditEventButton from '../forms/EditEventButton.js'


class AdminPanelComponent extends Component {
  constructor(props) {
    super(props);
    this.sendGuestList = this.sendGuestList.bind(this)
  }
  sendGuestList(id) {
console.log(id)
    console.log("Calling getCL method with id " + id)
    // Meteor.call('getCL', id)
  }

  render() {
    return (
      <div>
        
<section><h2>Helpers</h2>

<table>
<tbody>
<tr>
  <th>Name</th>
  <th>Date</th>
  <th>ID</th>
  <th>Edit</th>
  <th>Send GuestList</th>
</tr>
{ (!this.props.loading) ? (
  this.props.events.map((event) => {
    return (
      <tr key={event._id}>
        <td>{event.byline}</td>
        <td>{event.date.toDateString()}</td>
        <td>{event._id}</td>
        <td><EditEventButton event={event}/></td>
        <td><Button onClick={this.sendGuestList(event._id)}>Send GL </Button> </td>
      </tr>
      )
    })) : <tr><td><BarLoader 
              loading={this.props.loading} 
              color='#2964ff'
              width={-1}
              height={17}
            /></td></tr>
}
</tbody>
</table>

 </section>
<section><h2>Stats</h2> </section>
<section><h2></h2> </section>

      </div>
    );
  }
}

export default AdminPanel = withTracker(() => {
  return {
    loading: !Meteor.subscribe('events_current').ready(),
    events: Events.find({}, {
      sort: { date: 1 }
    }).fetch()
  }

})(AdminPanelComponent)