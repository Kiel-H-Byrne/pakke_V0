import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import './schemas';

const Venues = new Mongo.Collection('venues');

if (Meteor.isServer) {
  // ALLOW FOR SORTING (?) 
  Events._ensureIndex( { "address.zipcode": 1 } );

  Meteor.publish('venues_all', function () {
    const cursor = Venues.find();
    console.log("-= PUBLISHING: ALL ["+ cursor.count() +"] Venues =-");
    return cursor;
  });

  Meteor.publish('my_venues', function (userId) {
    const cursor = Venues.find({
      hostId: {}
    });
    console.log("-= PUBLISHING: ["+ cursor.count() +"] USER Venues =-");
    return cursor;
  });
}

Venues.allow({

  // only allow event creation if you are logged in
  insert: (userId, doc) => !! userId,
  // anyone can add themselves as guest to the event (update only guest scope of Event document).
  update: (userId, doc) => true
  // remove not authorized if not owner and not inside of a "creator" field of events.
});


export default Venues;