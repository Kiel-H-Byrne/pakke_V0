import { _ } from 'underscore';

// import '/imports/startup/collections/hosts.js';
import Events from '/imports/startup/collections/events';
import '/imports/startup/collections/roles';
import seedEventsData from './seedEventsData';

const seedEvents = function(data) {
  // console.log("-= Seeding 'Events' Collection: =-");
  // console.log(data)
  //ADMIN VENUE, PRIVATE?
  Meteor.call('addVenue', {
    "nickname": "The PAKKE Den",
    "address": " 1100 Blagden Alley NW" ,
    "location.lat": 38.906110 ,
    "location.lng": -77.025310,
    "description": "<p>Where Greatness Happens...</p>",
    "type": "Other",
    "capacity": "83" ,
    "ownedStatus": true,
  });
  _.each(data, function(doc) {
    if (doc.date) {
      let cleanDoc = Schema.Event.clean(doc);
      Meteor.call('addEvent', cleanDoc);
      // Meteor.call('addEvent', doc);
    }
  });
}

if ( Meteor.isClient && Meteor.isDevelopment ) {
    Meteor.subscribe('roles', {
    onReady: function () {
      if (Roles.userIsInRole(Meteor.userId(), "admin")) {
        // console.log("Admin logged in, Checking json files");
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
    }
  });
}


// const KIEL = Meteor.users.findOne({emails: 'PAKKE'});
// if (KIEL && !Roles.userIsInRole(KIEL._id, ['admin']) ) {
//       Roles.addUsersToRoles(KIEL)._id, 'admin');
// }