import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

// import Meteor from 'meteor/meteor';
// import Events from '../startup/collections/events';


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

    Tracker.autorun(c => {

        const completeFindAddress = new google.maps.places.Autocomplete(
          /** @type {!HTMLInputElement} */
          document.getElementById('findInput'),{
            types: ['address'],
            componentRestrictions: {country:'US'}
        });
      });
    
    if (!this.props.ready) {
      return <div>Loading</div>;
  }
    return (
      <form onSubmit={this.addEvents.bind(this)}>
        <input type='text' ref='eventName' />
        <input id="findInput" type='text' ref='eventAddress' />
        <button type='submit'>Add Event</button>
      </form>

    )
  };
};


export default withTracker(() => {
  let eventsSub = Meteor.subscribe('events_current');
  return {
    ready: eventsSub.ready()
  }
})(EventForm);
