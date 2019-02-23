import { Meteor } from 'meteor/meteor';

if ( Meteor.isServer ) {
  Meteor.publish('roles', function (){
      let cursor = Meteor.roles.find({});
      // console.log("-= PUBLISHING: ALL ["+ cursor.count() +"] ROLES =-");
      return cursor;
  });
}