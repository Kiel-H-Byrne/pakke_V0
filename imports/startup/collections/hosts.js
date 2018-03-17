// // I DON'T NEED THIS SCHEMA OR COLLECTION!? should ALL BE MERGED INTO USER() PROFILE AND 'HOST' ROLE.


// import './schemas.js';

// Hosts = new orion.collection('hosts', {
//   singularName: 'host', // The name of one of these items
//   pluralName: 'hosts', // The name of more than one of these items
//   link: { title: 'Hosts' },
//   /**
//    * Tabular settings for this collection
//    */
//   tabular: {
//     // here we set which data columns we want to appear on the data table
//     // in the CMS panel
//     columns: [
//       { 
//       //   data: "email", 
//       //   title: "E-Mail" 
//       // },{
//         data: "hostName", 
//         title: "Name" 
//       },{ 
//         data: "address.coords", 
//         title: "Coordinates" 
//       },{ 
//       //   data: "hostAddress.street", 
//       //   title: "Street" 
//       // },{ 
//       //   data: "hostAddress.corner", 
//       //   title: "Cross Streets" 
//       // },{ 
//       //   data: "hostAddress.city", 
//       //   title: "City" 
//       // },{ 
//       //   data: "hostAddress.state", 
//       //   title: "State" 
//       // },{ 
//         data: "hostAddress.zip", 
//         title: "Zip" 
//       },{ 
//         data: "profile.bio",
//         title: "Profile Bio",
//       //   data: "hostAddress.country", 
//       //   title: "Country" 
//       // },{ 
//       //   data: "phone", 
//       //   title: "Phone" 
//       // },{
//       //   data: "bio",
//       //   title: "Description"
//       // }, {
//       //   data: "events",
//       //   title: "Events"
//       },
//         // orion.attributeColumn('image', 'image', 'Image'),
//       orion.attributeColumn('createdBy', 'creator', 'Created By'),
//       orion.attributeColumn('createdAt', 'submitted', 'Created @') 
//     ]
//   }
// }


// // Hosts.attachSchema(Schema.Host);
// Hosts.attachSchema(Schema.Profile);

// //=================== COLLECTION SECURITY =========================

// Hosts.allow({

//   // only allow insertion if you are logged in
//   insert: (userId, doc) => !! userId,
//   update: (userId, doc) => !! userId,
//   remove: (userId, doc) => false
// });

// // Hosts.allow({
// //   insert: function (userId, doc) {
// //     // the user must be logged in, and the document must be owned by the user
// //     return (userId && doc.owner === userId);
// //   },
// //   update: function (userId, doc, fields, modifier) {
// //     // can only change your own documents
// //     return doc.owner === userId;
// //   },
// //   remove: function (userId, doc) {
// //     // can only remove your own documents
// //     return doc.owner === userId;
// //   },
// //   // fetch: ['owner']
// // });

// Hosts.deny({
//   update: function (userId, doc, fields, modifier) {
//     // can't change owners
//     return _.contains(fields, 'creator');
//   },
//   remove: function (userId, doc) {
//     // can't remove locked documents
//     return doc.locked;
//   },
//   // fetch: ['locked'] // no need to fetch 'owner'
// });


// export default Hosts;
