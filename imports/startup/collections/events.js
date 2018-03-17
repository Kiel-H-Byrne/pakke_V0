import './schemas.js';

Events = new Mongo.Collection('events');

if ( Meteor.isServer ) {
  // ALLOW FOR SORTING (?) 
  Events._ensureIndex( { date: 1 } );

  Meteor.publish('allEvents', function () {
        return Events.find({}, {
            limit: 50,
            sort: { lastUpdated: 1 }
        });
    });

Meteor.publish('events_current', function () {
    const cursor = Events.find({
      $and: [
        {"eventAddress.coords": { $exists : 1 }}
      ]
    });

  console.log("-= PUBLISHING: ALL ["+ cursor.count() +"] CURRENT EVENTS WITH LOCATIONS =-");
  return cursor;
});

Meteor.publish('events_retired', function () {
  let cursor = Events.find({
    retired: true, 
  });
  console.log("-= PUBLISHING: ALL ["+ cursor.count() +"] RETIRED EVENTS =-");
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
// Events.attachSchema(Schema.Event);

Events.allow({

  // only allow event creation if you are logged in
  insert: (userId, doc) => !! userId,
  // anyone can add themselves as guest to the event (update only guest scope of Event document).
  update: (userId, doc) => true
});



export default Events;
