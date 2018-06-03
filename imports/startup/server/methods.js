import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';

import Zoho from 'zoho';

import Events from '/imports/startup/collections/events';
import Venues from '/imports/startup/collections/venues';
import Uploads from '/imports/startup/collections/uploads';
import MongoCache from '/imports/startup/server/MongoCache';

const OCache = new MongoCache('rest', 100000);
const zcrm = new Zoho.CRM({authtoken: Meteor.settings.private.keys.zohoCRM.oAuth});

const apiCall = function (apiUrl, callback) {
  // try…catch allows you to handle errors 
  let errorCode, errorMessage;
  try {

    let dataFromCache = OCache.get(apiUrl);
    // console.log("key: "+apiUrl);
    let response = {};

    if(dataFromCache) {
      console.log("Data from Cache...");
      response = dataFromCache;
    } else {
      console.log("Data from API...");
      response = HTTP.get(apiUrl).data;
      OCache.set(apiUrl, response);
    }

    // A successful API call returns no error
    // but the contents from the JSON response
    if(callback) {
      callback(null, response);
    }
    
  } catch (error) {
    // If the API responded with an error message and a payload 
    if (error.response) {

      // console.log(error.response);
      errorCode = error.response.statusCode;
      errorMessage = error.response || error.response.data.error_message;
      console.log({errorCode, errorMessage});
    // Otherwise use a generic error message
    } else {
      errorCode = 500;
      errorMessage = 'No idea what happened!';
    }
    // Create an Error object and return it via callback
    // let myError = new Meteor.Error(errorCode, errorMessage);
    // callback(myError, null);
  }
};

Meteor.methods({
  addRole: function (id, role) {
    // check(id, Meteor.Collection.ObjectID);
    check(role, Array);
    Roles.addUsersToRoles( id , role );
  },
  editProfile: function(doc) {
    const uid = Meteor.userId();
    Meteor.users.update(uid, {
      $set: {
        profile: doc
      }
    });
    
  },
  addTalent: function(doc) {
    const uid = Meteor.userId();
    if ( !Roles.userIsInRole(Meteor.userId(), ["talent"]) ) {
      Meteor.call('addRole', uid, ["talent"]);
    }
     Meteor.users.update(uid, {
      $addToSet: { 
        "profile.talents" : doc
      }
    });
  },
  addVenue: function(doc) {
    const uid = Meteor.userId();
    Meteor.users.update(uid, {
      $addToSet: { 
        "profile.venues" : doc
      }
    });
  },
  addEvent: function(doc) {
    if (! Roles.userIsInRole(Meteor.userId(), ["host"])) {
      Meteor.call('addRole', Meteor.userId(), ["host"]);
    }

    Events.insert(doc , function(err, res){
      if (err) {
        console.log(`EVENT INSERT FAILED: ${doc.byline}: ${err}`);
      } else {
        console.log(`EVENT INSERT SUCCESS: ${doc.byline}`);
      }
    });
  },
  editEvent: function(id,doc) {
    //makre sure old object is added to new object, update rewrites fields.
    Events.update({_id: id}, {
      $set: doc
    })
  },
  addInterests(doc) {
    const uid = Meteor.userId(); 
    // console.log(doc);
    Meteor.users.update(uid, {
      $set: {"profile.interests": doc}
    });
  },
  amApplied: function(eventId) {
    // console.log(eventId, userId);
    Events.update(eventId, { $addToSet: { "appliedList": Meteor.userId() } }, (err,res) => {
      err ? console.log(err) : null;
    });
  },
  amInvited: function(eventId) {
    Events.update(eventId, { $addToSet: { "invitedList": Meteor.userId() } });
  },
  inviteGuests: function(eventId, emailsArray) {
    this.unblock()
    //SECURITY
    //check admin role 
    //find userid of each email address
    //send "Congrats! You've been invited! Please Buy Ticket" email to guest.
    if (Roles.userIsInRole(Meteor.userId(), ["admin"])) {
      let invitedEmailTitle, invitedEmailTemplate, invitedGuestsTemplate;
      const hid = Events.findOne(eventId).hostId;
      // const hid = event.hostId;
      const hostEmail = Meteor.users.findOne(hid).emails[0].address;
      emailsArray.map((email)=> {
        const uid = Accounts.findUserByEmail(email);
        Events.update(eventId, { $addToSet: { "invitedList": uid } }); 
        Email.send({
          to: email, 
          from: 'noreply@pakke.us', 
          subject: invitedEmailTitle, 
          html: invitedEmailTemplate 
        });
      });
      // Email.send({
      //   to: hostEmail , 
      //   from: 'noreply@pakke.us', 
      //   subject: `Your Guest List for '${event.byline}'`, 
      //   html: invitedGuestsTemplate 
      // });
    } else {  
      console.log("Must be ADMIN to invite to events");
    }
  },
  amConfirmed: function(eventId) {
    Events.update(eventId, { $addToSet: { "confirmedList": Meteor.userId() } });
  },
  geoCode: function(address) {
    this.unblock();
    check(address, String);
    address = encodeURIComponent(address);
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${Meteor.settings.private.keys.googleAPI.key}`;
    console.log(`--URL-- ${apiUrl}`);
    
    const response = Meteor.wrapAsync(apiCall)(apiUrl);
    
    if (response) {
      // console.log("Geo RESPONSE:");
      // console.log(response.results[0]);
      return response;
    }
  }, 
  crmInsert: function(module, params, callback) {
      check(module, String);
      check(params, Object);
    // crm_modules = [leads,accounts, contacts, potentials, campaingns, cases, solutions, products, price books, quotes, invoices, saleds orders, vendors, purchase orders, events, takss, calls]
    zcrm.createRecord(module, params, function(err,data) {
      if (err) {
        console.log(err);
      }
      console.log(`-= NEW ${module.toUpperCase()}! =- `);
    });
  },
  crmGet: function(module, params, callback) {
    zcrm.getRecords(module, params, function(err,res) {
      if (err) {
        return console.log(err);
      }
      console.log(res.data);
      return res.data;
    });
  },
  createCharge: function(amount, description, token) {
    //makre sure old object is added to new object, update rewrites fields.
    const stripe = require("stripe")(Meteor.settings.private.keys.stripe.key);

    description = `PAKKE EVENT: ${description}`;
    
    // console.log(token);
    stripe.charges.create({
      amount: amount*100,
      currency: 'usd',
      description: description,
      source: token.id,
    }, (err,charge) => {
      if (err) {
        // throw new Meteor.Error("charge-alert", err.message);
        console.log(err.message);
      } 
      return charge;
    });
  },
  uploadFile: function(obj) {
    let upload =  Uploads.insert(obj, false);
    console.log(upload);
    return upload;

  },
  removeFile: function() {

  },
  sendEmail: function(to, from, subject, html) {
    // check([to, from, subject, html], [String]);
    this.unblock();

    //check if logged in, or else anyone can send email from client
    Email.send({to, from, subject, html });
  }
  
});


