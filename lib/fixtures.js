// import '/imports/startup/collections/hosts.js';
import Events from '/imports/startup/collections/events';
import '/imports/startup/collections/roles';
import seedEventsData from './seedEventsData';

const seedEvents = function(data) {
  console.log("-= Seeding 'Events' Collection: =-");
  console.log(data)

  _.each(data, function(doc) {
    if (doc.date) {
      let cleanDoc = Schema.Event.clean(doc);
      Meteor.call('addEvent', cleanDoc);
      // Meteor.call('addEvent', doc);
    }
  });
}

if (Meteor.isClient ) {
  //REMOVE ME: DON'T NEED TO SEED EVENTS IN PROD
  Meteor.subscribe('events_all', {
    onReady: function () {
      const max = 5;
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