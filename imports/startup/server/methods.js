import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import Zoho from 'zoho';

import Events from '/imports/startup/collections/events';
import Venues from '/imports/startup/collections/events';
import MongoCache from '/imports/startup/server/MongoCache';


const OCache = new MongoCache('rest', 100000);
const zcrm = new Zoho.CRM({authtoken: Meteor.settings.private.keys.zohoCRM.oAuth});

apiCall = function (apiUrl, callback) {
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
  // attendEvent(thisUserId, eventId) {
  //     if (!Meteor.userId()) {
  //         throw new Meteor.Error('not authorized');
  //         this.stop();
  //         return false;
  //     } else {
  //         Events.update(eventId, { $addToSet: { guests: thisUserId } });
  //     }
  // },
  addRole: function (id, role) {
    // check(id, Meteor.Collection.ObjectID);
    check(role, Array);
    Roles.addUsersToRoles( id , role );
  },
  editProfile: function(type, doc) {
    if ( (type == 'asHost') && (! Roles.userIsInRole(Meteor.userId(), ["host"])) ) {
      Meteor.call('addRole', Meteor.userId(), ["host"]);
    } 
    
    if ( (type == 'asTalent') && (! Roles.userIsInRole(Meteor.userId(), ["talent"])) ) {
      Meteor.call('addRole', Meteor.userId(), ["talent"]);
    }

    const uid = Meteor.userId();
    let profile = Meteor.user().profile;
    let concat = `profile.${type}`;
    // profile[type] = doc;
    console.log(concat, doc);
   
  },
  addTalent: function(doc) {
    const uid = Meteor.userId();
    if ( !Roles.userIsInRole(Meteor.userId(), ["talent"]) ) {
      Meteor.call('addRole', uid, ["talent"]);
    }
     Meteor.users.update(uid, {
      $addToSet: { 
        "profile.asTalent.talents" : doc
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
  amApplied: function(eventId, userId) {
    // console.log(eventId, userId);
    Events.update(eventId, { $addToSet: { "appliedList": userId } }, (err,res) => {
      err ? console.log(err) : null;
    });
  },
  amInvited: function(eventId, userId) {
    Events.update(eventId, { $addToSet: { "invitedList": userId } });
  },
  amConfirmed: function(eventId, userId) {
    Events.update(eventId, { $addToSet: { "confirmedList": userId } });
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
        return console.log(err);
      }
      console.log(data);
      console.log(`-= NEW LEAD! =- `);
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
  sendEmail: function(to, from, subject, html) {
    // check([to, from, subject, html], [String]);
    this.unblock();

    //check if logged in, or else anyone can send email from client
    Email.send({to, from, subject, html });
  },
  addtoInviteList: function(email, eventId) {
    if (Roles.userIsInRole(Meteor.userId(), ["admin"])) {
      const userId = Accounts.findUserByEmail(email)._id;
      Events.update(eventId, { $addToSet: { "invitedList": userId } });
    } else {  
      console.log("Must be ADMIN to invite to events");
    }
  },
  
});


