// import '/imports/startup/collections/hosts.js';
import Events from '/imports/startup/collections/events';
import '/imports/startup/collections/roles';
import seedEventsData from './seedEventsData';

const json_hosts = require("./seed_hosts.json")
const json_events = require("./seed_events.json")
// const seedEventsData = require('./seedEventsData.js')

// console.log(seedEvents[0]['image'])

if (Meteor.isClient) {
  console.log("No Events, so checking json files");
  Meteor.subscribe('events_all', {
    onReady: function () {
      const max = 2;
      const count = Events.find().count();
      if (count < max) {
        console.log("-= EVENTS Less than " + max + " =-");
        // readJSON(json_events);
        seedEvents(seedEventsData);
      } else {
        // COLLECTION is full
      }
    }
  });
}

//helper function

const seedEvents = function(data) {
  
  let arrayName = 'seedEventsData'
  let eventsArray = seedEventsData;
  console.log(eventsArray)

  console.log("-= Seeding from JSON file: '"+ arrayName +"' =-");

  _.each(eventsArray, function(doc) {
    if (doc.date) {
      console.log("calling addEvent");
      Meteor.call('addEvent', doc);
      // Meteor.call('seedEvents', doc );
    }
  });
}
