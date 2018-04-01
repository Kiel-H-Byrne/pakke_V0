import { Meteor } from 'meteor/meteor';

import Events from '../imports/startup/collections/events';
import '../imports/startup/server/index';

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


// Meteor.startup(() => {
//   // code to run on server at startup
//   if (Meteor.users.find().count() === 0) {
//     // create a date string
//     var year = new Date().getFullYear();
//     var month = new Date().getMonth() + 1;
//     var day = new Date().getDate();
//     var date = (month + "/" + day + "/" + year).toString();
    
//     	// Super User
//       Accounts.createUser({
//         username: 'Super User',
//         email: 'Super@user.com',
//         password: 'password',
//         profile: {
//         	host: false,
//         }
//       });

//       var user0Id = Meteor.users.findOne({username: 'Super User'})._id;

//       console.log("Super User Created");
//       console.log("Super User Event Created");

//       // User 1
//       Accounts.createUser({
//         username: 'User1',
//         email: 'user1@example.com',
//         password: 'password',
//         profile: {
//           host: false,
//         }
//       });

//       var user1Id = Meteor.users.findOne({username: 'User1'})._id;

      
//       console.log("User1 Created");
//       console.log("User1 Event Created");

//       // User 2
//       Accounts.createUser({
//         username: 'User2',
//         email: 'user2@example.com',
//         password: 'password',
//         profile: {
//           host: false,
//         }
//       });

//       var user2Id = Meteor.users.findOne({username: 'User2'})._id;

      
//       console.log("User2 Created");
//       console.log("User2 Event Created");

//       // User 3
//       Accounts.createUser({
//         username: 'User3',
//         email: 'user3@example.com',
//         password: 'password',
//         profile: {
//           host: false,
//         }
//       });

//       var user3Id = Meteor.users.findOne({username: 'User3'})._id;

 
//       console.log("User3 Created");
//       console.log("User3 Event Created");

//       // User 4
//       Accounts.createUser({
//         username: 'User4',
//         email: 'user4@example.com',
//         password: 'password',
//         profile: {
//           host: false,
//         }
//       });

//       var user4Id = Meteor.users.findOne({username: 'User4'})._id;

//       // Events.insert({
//       //   eventHostUserId: user0Id,
//       //   eventHostUserName: "Super User",
//       //   date: date,
//       //   createdAt: new Date(),
//       //   eventName: "Event 0",
//       //   eventAddress: "Columbia Heights Washington DC",
//       //   attendees: ["Super User"],
//       // });

//       // Events.insert({
//       //   eventHostUserId: user1Id,
//       //   eventHostUserName: "User1",
//       //   date: date,
//       //   createdAt: new Date(),
//       //   eventName: "Event 1",
//       //   eventAddress: "Petworth",  
//       //   attendees: ["User1"],
//       // });

//       // Events.insert({
//       //   eventHostUserId: user2Id,
//       //   eventHostUserName: "User2",
//       //   date: date,
//       //   createdAt: new Date(),        
//       //   eventName: "Event 2",
//       //   eventAddress: "White House",        
//       //   attendees: ["User2"],
//       // });

//       // Events.insert({
//       //   eventHostUserId: user3Id,
//       //   eventHostUserName: "User3",
//       //   date: date,
//       //   createdAt: new Date(),
//       //   eventName: "Event 3",
//       //   eventAddress: "Shaw Washington DC",        
//       //   attendees: ["User3"],
//       // });

//       // Events.insert({
//       //   eventHostUserId: user4Id,
//       //   eventHostUserName: "User4",    
//       //   date: date,
//       //   createdAt: new Date(),
//       //   eventName: "Event 4",
//       //   eventAddress: "mt. vernon sq",        
//       //   attendees: ["User4"],
//       // });

//       console.log("User4 Created");
//       console.log("User4 Event Created");
//       console.log("  ");
//       console.log("User Database Seeded");
//       console.log("Event Database Seeded");
//   }
// });
