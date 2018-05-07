import { Meteor } from 'meteor/meteor';
import Events from './events';

Meteor.publish('currentUser', function () {
  console.log("-= PUBLISHING: USER DATA  =-");
  return Meteor.users.find({_id: Meteor.userId()}, {
    fields: {
      'profile': 1,
      'roles': 1,
      'services': 1
    }
  });
});

Meteor.publish('eventHost', function (eventId) {
  console.log("-= PUBLISHING: HOST USER DATA  =-");
  let event = Events.findOne(eventId);
  let eventHost = event.hostId;
  return Meteor.users.find({_id: eventHost}, {
    fields: {
      'profile': 1
    }
  });
});


Meteor.users.allow({
  update: (uid, doc) => {return uid ;},
  remove: () => true,
});