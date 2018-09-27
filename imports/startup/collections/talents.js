import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import './schemas';

Talents = new Mongo.Collection('talents');

if (Meteor.isServer) {
  // ALLOW FOR SORTING (?) 
  // Talents._ensureIndex( { "address.zipcode": 1 } );

  Meteor.publish('talents_all', function () {
    const cursor = Talents.find();
    // console.log("-= PUBLISHING: ALL ["+ cursor.count() +"] Talents =-");
    return cursor;
  });

  Meteor.publish('my_talents', function () {
    const cursor = Talents.find({
      hostId: this.userId
    });
    // console.log("-= PUBLISHING: ["+ cursor.count() +"] USER Talents =-");
    return cursor;
  });

  Meteor.publish('event_talent', function (eventId) {
    const cursor = Talents.find({
      events: { $in: [eventId] }
    });
    // console.log("-= PUBLISHING: ["+ cursor.count() +"] Event Venue =-");
    return cursor;
  });

  Meteor.publish('talent', function (id) {
    let cursor = Talents.find({
      _id: id
    });
    return cursor;
  });
}

Talents.allow({

  // only allow event creation if you are logged in
  insert: (userId, doc) => !! userId,
  // anyone can add themselves as guest to the event (update only guest scope of Event document).
  update: (userId, doc) => doc.hostId == userId
  // remove not authorized if not owner and not inside of a "creator" field of events.
});


export default Talents;