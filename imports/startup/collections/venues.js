import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import './schemas';

const Venues = new Mongo.Collection('venues');

if (Meteor.isServer) {
  // ALLOW FOR SORTING (?) 
  Venues._ensureIndex( { "address.zipcode": 1 } );

  Meteor.publish('venues_all', function () {
    const cursor = Venues.find();
    // console.log("-= PUBLISHING: ALL ["+ cursor.count() +"] Venues =-");
    return cursor;
  });

  Meteor.publish('my_venues', function () {
    const cursor = Venues.find({
      hostId: this.userId
    });
    // console.log("-= PUBLISHING: ["+ cursor.count() +"] USER Venues =-");
    return cursor;
  });

  Meteor.publish('event_venue', function (eventId) {
    const cursor = Venues.find({
      events: { $in: [eventId] }
    });
    // console.log("-= PUBLISHING: ["+ cursor.count() +"] Event Venue =-");
    return cursor;
  });
}

Venues.allow({

  // only allow event creation if you are logged in
  insert: (userId, doc) => !! userId,
  // anyone can add themselves as guest to the event (update only guest scope of Event document).
  update: (userId, doc) => doc.hostId == userId
  // remove not authorized if not owner and not inside of a "creator" field of events.
});


export default Venues;