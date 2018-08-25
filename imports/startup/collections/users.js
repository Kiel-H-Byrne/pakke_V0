import { Meteor } from 'meteor/meteor';
import Events from './events';

Meteor.publish('currentUser', function () {
  // console.log("-= PUBLISHING: USER DATA  =-");
  return Meteor.users.find({_id: this.userId}, {
    fields: {
      'profile': 1,
      'roles': 1,
      'services.facebook': 1,
      'services.google': 1
    }
  });
});

Meteor.publish('publicUser', function (id) {
  // console.log("-= PUBLISHING: USER DATA  =-");
  return Meteor.users.find({_id: id}, {
    fields: {
      'profile': 1
    }
  });
});

Meteor.publish('eventHost', function (eventId) {
  // console.log("-= PUBLISHING: HOST USER DATA  =-");
  let event = Events.findOne(eventId);
  if (event) {
  let eventHost = event.hostId;
  return Meteor.users.find({_id: eventHost}, {
    fields: {
      'profile': 1
    }
  });
}
});


Meteor.users.allow({
  update: (uid, doc) => {return uid ;},
  remove: () => true,
});