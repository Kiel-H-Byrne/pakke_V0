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

Meteor.publish('users_all', function () {
  // console.log("-= PUBLISHING: USER DATA  =-");
  return Meteor.users.find({}, {
    fields: {
      'username': 1,
      'emails': 1
    }
  });
});

Meteor.publish('publicUser', function (id) {
  // console.log("-= PUBLISHING: USER DATA  =-");
  return Meteor.users.find({_id: id}, {
    fields: {
      'username': 1,
      'profile': 1
    }
  });
});

Meteor.publish('users.confirmedList', function(list) {
  // check(list,Array);
  let cursor = Meteor.users.find({ _id: { $in: list } },{
    fields: {
      'profile': 1
    }  
  })
  // console.log(cursor);
  return cursor;
});

Meteor.publish('users.event_host', function (eventId) {
  // console.log("-= PUBLISHING: HOST USER DATA  =-");
  let eventHost = Events.findOne(eventId).hostId;
  let cursor =  Meteor.users.find({_id: eventHost}, {
    fields: {
      'profile': 1
    }
  });
  return cursor;
});


Meteor.users.allow({
  update: (uid, doc) => {return uid ;},
  remove: () => false,
});