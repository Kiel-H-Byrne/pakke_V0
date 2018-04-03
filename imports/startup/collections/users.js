import { Meteor } from 'meteor/meteor';

Meteor.publish('currentUser', function () {
  console.log("-= PUBLISHING: USER DATA  =-");
  return Meteor.users.find({_id: this.userId}, {
    fields: {
      'profile': 1,
      'roles': 1,
      'services.facebook': 1,
      'services.google': 1
    }
  });
});


Meteor.users.allow({
  update: (uid, doc) => {return uid ;},
  remove: () => true,
});