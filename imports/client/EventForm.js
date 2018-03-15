import React, { Component } from 'react';
// import Meteor from 'meteor/meteor';
import Events from '../api/Events';
import { withTracker } from 'meteor/react-meteor-data';




class EventForm extends Component {

  addEvents(event) {
    event.preventDefault();
    const eventName = this.refs.eventName.value;
    const eventAddress = this.refs.eventAddress.value;
    console.log(eventName)
    console.log(eventAddress)
    if (eventName !== '' && eventAddress !== '') {

      Meteor.call('createEvent', eventName, eventAddress);
      
      this.refs.eventName.value = '';
      this.refs.eventAddress.value = '';

      Bert.alert("Your Event Was Posted!", "success");

    } else {

      Bert.alert("something went wrong", "danger");
    }
  };

  render() {
    if (!this.props.ready) {
      return <div>Loading</div>;
  }
    return (
      <form onSubmit={this.addEvents.bind(this)}>
        <input type='text' ref='eventName' />
        <input type='text' ref='eventAddress' />
        <button type='submit'>Add Event</button>
      </form>

    )
  };
};


export default withTracker(() => {
  let eventsSub = Meteor.subscribe('allEvents');
  return {
    ready: eventsSub.ready()
  }
})(EventForm);
