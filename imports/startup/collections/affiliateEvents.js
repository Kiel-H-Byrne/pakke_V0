import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import './schemas';

AffiliateEvents = new Mongo.Collection('affiliate_events');

// AffiliateEvents.attachSchema(Schema.Event);


if (Meteor.isServer) {
  // ALLOW FOR SORTING (?) 
  // AffiliateEvents._ensureIndex( { lastUpdated: 1 } );

  Meteor.publish('affiliate_events_all', function () {
      const cursor = AffiliateEvents.find();

    // console.log("-= PUBLISHING: ALL ["+ cursor.count() +"] AffiliateEvents =-");
    return cursor;
  });

  Meteor.publish('affiliate_events_current', function () {
      const cursor = AffiliateEvents.find({
        date: {
          $gte: new Date() 
        },
      },
      {
        sort: { date: 1 }
      });

    // console.log("-= PUBLISHING: ALL ["+ cursor.count() +"] CURRENT AffiliateEvents =-");
    return cursor;
  });

 
  Meteor.publish('affiliate_events_retired', function () {
    let cursor = AffiliateEvents.find({
      date: {
        $lt: new Date() 
      }, 
    });
    // console.log(`-= PUBLISHING: ALL [${cursor.count()}] RETIRED AffiliateEvents =-`);
    return cursor;
  });

  Meteor.publish('affiliate_event', function (id) {
    let cursor = AffiliateEvents.find({
      _id: id
    });
    return cursor;
  });

  Meteor.publish('affiliate_events_featured', function (id) {
    let cursor = AffiliateEvents.find({
      "featured": true
    });
    // console.log(`-= PUBLISHING: [${cursor.count()}] FEATURED AffiliateEvents =-`);
    return cursor;
  });

}

/// =============== SECURITY =============== ///////
AffiliateEvents.allow({

  // only allow event creation if you are logged in
  insert: (userId, doc) => !! userId,
// anyone can add themselves as guest to the event (update only guest scope of Event document).
  // update: (userId, doc) => true
  update: (userId, doc) => userId == doc.hostId
  //only allow update if userID is event.hostId
  // remove not authorized if not owner and not inside of a "creator" field of AffiliateEvents.
});


export default AffiliateEvents;
