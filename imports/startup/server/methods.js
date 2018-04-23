import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';

import Events from '/imports/startup/collections/events';
import Venues from '/imports/startup/collections/events';

import MongoCache from '/imports/startup/server/MongoCache.js';

const OCache = new MongoCache('rest', 100000);

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
  attendEvent(thisUserId, eventId) {
      if (!Meteor.userId()) {
          throw new Meteor.Error('not authorized');
          this.stop();
          return false;
      } else {
          Events.update(eventId, { $addToSet: { guests: thisUserId } });
      }
  },
  addUser: function(email,password, role){
    check(email,String);
    check(password,String);    
    const id = Accounts.createUser({
      email: email,
      password: password,
    })    
    Roles.addUsersToRoles( id._id ,  role );
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
    profile[type] = doc;
    
    Meteor.users.update(uid, {
      $set: { "profile" : profile}
    });
  },
  addRole: function (id, role) {
    // check(id, Meteor.Collection.ObjectID);
    check(role, Array);
    Roles.addUsersToRoles( id , role );
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
  geoCode: function(address) {
    this.unblock();
    
    let urlParams;
    if (typeof address === "object" && ! _.isEmpty(address))  {
      urlParams = _.values(address);
    } else {
      // console.log(address);
      urlParams = address;
    }

    let apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + urlParams + '&key=' + Meteor.settings.private.keys.googleAPI.key;
    console.log("--URL--"+apiUrl);
    let response = Meteor.wrapAsync(apiCall)(apiUrl);
    if (response) {
      // console.log("Geo RESPONSE:");
      // console.log(response);
      return response;
    }
    return;
  }, 
  httpGeo : function(address) {
    check(address,String);
    this.unblock();
    paramsObj = {
      params: {
        address: address,
        key: Meteor.settings.private.keys.googleAPI.key
      }
    };
    try {
      const result = HTTP.get('https://maps.googleapis.com/maps/api/geocode/json', paramsObj);
      let loc = result.data.results[0].geometry.location;
      // console.log(loc);
      return true;
    } catch (e) {
      // Got a network error, timeout, or HTTP error in the 400 or 500 range.
      // console.log(e);
      return false;
    }
  },
  sendEmail: function(to, from, subject, html) {
    check([to, from, subject, html], [String]);
    this.unblock();

    //check if logged in and is admin user, or else anyone can send email from client
    Email.send({to, from, subject, html });
  }
});

