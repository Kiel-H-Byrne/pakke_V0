import './schemas.js';

Guests = new Mongo.Collection('guests');

// Guests.attachSchema(Schema.Guest);

Guests.allow({

  // only allow Guest creation if you are logged in and a host
  insert: (userId, doc) => true,
  // only allow update if owner of that Guest.
  update: (userId, doc) => true,
  remove: (userId, doc) => false
});


export default Guests;
