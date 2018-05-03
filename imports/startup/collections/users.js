import { Meteor } from 'meteor/meteor';


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



Meteor.users.allow({
  update: (uid, doc) => {return uid ;},
  remove: () => true,
});