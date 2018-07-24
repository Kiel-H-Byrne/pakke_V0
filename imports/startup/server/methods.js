import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';

import Zoho from 'zoho';

import Events from '/imports/startup/collections/events';
import Venues from '/imports/startup/collections/venues';
import Avatars from '/imports/startup/collections/avatars';
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
    const uid = this.userId;
    Meteor.users.update(uid, {
      $set: {
        profile: doc
      }
    });
    
  },
  addTalent: function(doc) {
    const uid = this.userId;
    if ( !Roles.userIsInRole(uid, ["talent"]) ) {
      Meteor.call('addRole', uid, ["talent"]);
    }
     Meteor.users.update(uid, {
      $addToSet: { 
        "profile.talents" : doc
      }
    });
  },
  addVenue: function(doc) {
    Venues.insert(doc, (err,res) => {
      if (err) {
        console.log(`VENUE INSERT FAILED: ${doc.nickname}: ${err}`);
      } else {
        console.log(`NEW VENUE: ${doc.nickname}`);

        // Email.send({
        //   to: 'info@pakke.us', 
        //   from: 'noreply@pakke.us', 
        //   subject: 'EVENT ALERT: New Event Created', 
        //   html: newEventEmailTemplate 
        // });

      }
    })
  },
  editVenue: function(id,doc) {
    //makre sure old object is added to new object, update rewrites fields.
    Venues.update({_id: id}, {
      $set: doc
    })
  },
  addEvent: function(doc) {
    let newEventEmailTemplate = `
      
    `;
    if (! Roles.userIsInRole(this.userId, ["host"])) {
      Meteor.call('addRole', this.userId, ["host"]);
    }

    Events.insert(doc , function(err, res){
      if (err) {
        console.log(`EVENT INSERT FAILED: ${doc.byline}: ${err}`);

      } else {
        console.log(`NEW EVENT: ${doc.byline}`);

        Email.send({
          to: 'info@pakke.us', 
          from: 'noreply@pakke.us', 
          subject: 'EVENT ALERT: New Event Created', 
          html: newEventEmailTemplate 
        });

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
    const uid = this.userId; 
    // console.log(doc);
    Meteor.users.update(uid, {
      $set: {"profile.interests": doc}
    });
  },
  amApplied: function(eventId,user) {
    // console.log(eventId, userId);
    Events.update(eventId, { $addToSet: { "appliedList": user._id } }, (err,res) => {
      err ? console.log(err) : null;
    });
  },
  amInvited: function(eventId,user) {
    Events.update(eventId, { $addToSet: { "invitedList": this.userId } });
  },
  inviteGuests: function(eventId, emailsArray) {
    this.unblock()
    //SECURITY
    //check admin role 
    //find userid of each email address
    //send "Congrats! You've been invited! Please Buy Ticket" email to guest.
    if (Roles.userIsInRole(this.userId, ["admin"])) {
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
    Events.update(eventId, { $addToSet: { "confirmedList": this.userId } });
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
  createCharge: function(email,amount, description, token) {
    //makre sure old object is added to new object, update rewrites fields.
    const stripe = require("stripe")(Meteor.settings.private.keys.stripe.key);
    description = `PAKKE EVENT: ${description}`;
    
    // console.log(token);
    stripe.charges.create({
      amount: amount*100,
      currency: 'usd',
      description: description,
      source: token.id,
      receipt_email: email,
      capture: false
    }, (err,charge) => {
      if (err) {
        console.log("err",err.message)
        let error = err.message;
        return
      } else {
        console.log('Payment Received: ' + description)
        return charge;
      }
    })
  },
  uploadFile: function(obj) {
    let upload =  Avatars.insert(obj, false);
    console.log(upload);
    return upload;

  },
  removeFile: function(fileId) {
    Uploads.remove(fileId);
  },
  sendEmail: function(to, from, subject, html) {
    // check([to, from, subject, html], [String]);
    this.unblock();

    //check if logged in, or else anyone can send email from client
    Email.send({to, from, subject, html });
  },
  getCL: function(eventId) {
    if (Roles.userIsInRole(this.userId, ["admin"])) {
      const event = Events.findOne({_id: eventId});
      const CL = event.confirmedList;
      let htmlRowsArray = [];
      CL.map((uid) => {
        let u = Meteor.users.findOne({_id: uid});
        htmlRowsArray.push(`
          <tr> 
            <td>${u.profile.name}</td>
            <td>${u.emails[0].address}</td>
            <td><img style="border-radius:50%" src="${u.profile.avatar}" height="50" width="50" /></td>
          </tr>
        `);

      });
      let htmlRows = htmlRowsArray.join('');
      const template = `
      <h3> GUEST LIST: <em>"${event.byline}"</em> </h3>
      <h4> GUEST COUNT: ${CL.length} </h4>
          <table> <thead> <tr> <th>Name</th> <th>E-mail</th> <th>Picture</th> </tr> </thead> <tbody>
          ${htmlRows}
          </tbody></table>`;
      // console.log(template)

      Email.send({
        'to': ["info@pakke.us"],
        'cc': ["amy@pakke.us", "emmett@pakke.us", "zach@pakke.us", "kiel@pakke.us"],
        'from': "noreply@pakke.us", 
        'subject': "-<{ GUEST LIST: " + event.byline + " }>-", 
        'html': template
      });
      //send email to kiel@Pakke.us with this info
     } else {
      console.log("MUST BE ADMIN TO GET CONFIRMED LIST")
     }
  }
  
});