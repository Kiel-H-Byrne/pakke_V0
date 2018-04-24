import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import './schemas';

Events = new Mongo.Collection('events');

// Events.attachSchema(Schema.Event);


if (Meteor.isServer) {
  // ALLOW FOR SORTING (?) 
  Events._ensureIndex( { lastUpdated: 1 } );

  Meteor.publish('events_all', function () {
      const cursor = Events.find();

    console.log("-= PUBLISHING: ALL ["+ cursor.count() +"] EVENTS =-");
    return cursor;
  });

  Meteor.publish('events_current', function () {
      const cursor = Events.find({
        date: {
          $gte: new Date() 
        }, 
        // $and: [
        //   {"eventAddress.coords": { $exists : 1 }}
        // ]
      },
      {
        sort: { date: 1 }
      });

    console.log("-= PUBLISHING: ALL ["+ cursor.count() +"] CURRENT EVENTS WITH LOCATIONS =-");
    return cursor;
  });

  Meteor.publish('events_retired', function () {
    let cursor = Events.find({
      date: {
        $lt: new Date() 
      }, 
    });
    console.log(`-= PUBLISHING: ALL [${cursor.count()}] RETIRED EVENTS =-`);
    return cursor;
  });

  Meteor.publish('event', function (id) {
    let cursor = Events.findOne({
      _id: id
    });
    return cursor;
  });

Meteor.publish('events_featured', function (id) {
    let cursor = Events.find({
      "featured": true
    });
    console.log(`-= PUBLISHING: [${cursor.count()}] FEATURED VENTS =-`);
    return cursor;
  });

  Meteor.publish('event.host', function (id) {
    //event id = id
    //find host id , find and return one host document.
    const hostId = Events.findOne({_id: id}).hostID;
    let cursor = Meteor.users.find({
      _id: hostId, 
    });
    console.log(`-= PUBLISHING: HOST OF [${id}] EVENT =-`);
    return cursor;
  });

}

/// =============== SECURITY =============== ///////
Events.allow({

  // only allow event creation if you are logged in
  insert: (userId, doc) => !! userId,
  // anyone can add themselves as guest to the event (update only guest scope of Event document).
  update: (userId, doc) => true
  // remove not authorized if not owner and not inside of a "creator" field of events.
});


export default Events;
