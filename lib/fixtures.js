// import '/imports/startup/collections/hosts.js';
import '/imports/startup/collections/events';
import '/imports/startup/collections/roles';

const json_hosts = require("./seed_hosts.json")
const json_events = require("./seed_events.json")

const readJSON = function(fileName) {
      // console.log(fileName);
  let arrayName = Object.keys(fileName)[0];
  let jsonArray = fileName[Object.keys(fileName)[0]];

  console.log("-= Seeding from JSON file: '"+ arrayName +"' =-");

  _.each(jsonArray, function(doc) {
    if (doc.date) {
      console.log("calling addEvent");
      Meteor.call('addEvent', doc);
    }
  });
};

if (Meteor.isClient) {
  console.log("No Events, so checking json files");
  Meteor.subscribe('events_all', {
    onReady: function () {
      const max = 2;
      const count = Events.find().count();
      if (count < max) {
        console.log("-= EVENTS Less than " + max + " =-");
        readJSON(json_events);
      } else {
        // COLLECTION is full
      }
    }
  });
}









// if (Meteor.isServer) {

// // if ( !Meteor.users.findOne({username: 'emmett'})) {
// // console.log("Adding E");
// // let emmettId = Accounts.createUser({
// //     profile: {
// //       name: "Emmett Ferra",
// //     },
// //     username: "emmett",
// //     email: "emmett@pakke.com",
// //     password: "password",
// //   });
// // }  
  
// // if ( !Meteor.users.findOne({username: 'cherylle'})) {
// // console.log("Adding C");
// // let cherylleId = Accounts.createUser({
// //     profile: {
// //       name: "Cherylle Cadle",
// //     },
// //     username: "cherylle",
// //     email: "cherylle@pakke.com",
// //     password: "password",
// //   });
// // }  

// // if (Meteor.users.findOne({username: 'emmett'})) {
// //   let emmett = Meteor.users.findOne({username: 'emmett'});
// //   // Roles.addUserToRoles(emmett._id, ["admin"]);
// // }
// // if (Meteor.users.findOne({username: 'cherylle'})) {
// //   let cherylle = Meteor.users.findOne({username: 'cherylle'});
// //   // Roles.addUserToRoles(cherylle._id, ["admin"]);
// // }
  
//   // let host1 = Meteor.users.findOne({username: 'rmort'});

//   // if (!host1) {
//   //   let id1 = Accounts.createUser({
//   //     profile: {
//   //       name: "Randolph Mortimer",
//   //       email: "RAM@PMail.com",
//   //       address: {
//   //         zip: "20007"
//   //       }
//   //     },
//   //     username: "rmort",
//   //     password: "password"
//   //   });
    
//   //   // if (id1) { Roles.addUserToRoles(id1, ["host"]); }
//   // }

//   // let host2 = Meteor.users.findOne({username: 'fskit'});
//   // if (!host2) {
//   //   let id2 = Accounts.createUser({
//   //     profile: {
//   //       name: "Fermbo Skitomo",
//   //       email: "Femi@realmail.com",
//   //       address: {
//   //         zip: "20910"
//   //       },
//   //     username: "fskit",
//   //     password: "password"
//   //     }
//   //   });
//   //   // if (id2) { Roles.addUserToRoles(id2, ["host"]); }
//   // }
//   // if (!host3) {
//   // let host3 = Meteor.users.findOne({username: 'cahyoung'});
//   //   let id3 = Accounts.createUser({
//   //     profile: {
//   //       name: "Conor Ahyoung",
//   //       email: "CIA@email.com",
//   //       address: {
//   //         corner: "24th & M St.",
//   //         state: "DC",
//   //         zip: "20037"
//   //       },
//   //     username: "cahyoung",
//   //     password: "password"
//   //     }
//   //   });
//   //   // if (id3) { Roles.addUserToRoles(id3, ["host"]); }
//   // }
  
// }
