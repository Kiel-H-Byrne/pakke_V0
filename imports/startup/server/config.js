import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';


//check for settings file
console.log("-= Settings: Checking... =-");
if (!Meteor.settings.public.keys) {
    console.log("--------------= SETTINGS FAILED. (USE 'NPM RUN' INSTEAD OF 'METEOR' AT COMMAND LINE) =--------------");
} else {console.log ("-= Settings: Loaded =-");}

if (Meteor.users.find().count() == 0) {
  console.log("CREATING FIRST USER: SOUP");
  const soupId = Accounts.createUser({
      username: "Soup",
      email: "soup@pakke.us",
      password: "password",
      avatar: 'https://www.pakke.us/img/brand/PAKKE_circle.png',
      name: "Souper Youzer",
      firstName: "Souper",
      lastName: "Youzer"
  });

}

Meteor.users.allow({
  update: (uid, doc) => {return uid ;},
  remove: () => true,
});

const SOUP = Meteor.users.findOne({username: 'Soup'});
if ( SOUP ) {
    // console.log(SOUP);
    // Roles.addUsersToRoles( Kiel._id ,  ["admin"] );
    // Meteor.call('addRole', SOUP._id, ['admin'])
    Roles.addUsersToRoles(SOUP._id, 'admin', Roles.GLOBAL_GROUP)

    // Roles.setUserRoles( SOUP._id , 'admin');
    console.log("-= ADMIN: 'Soup' is Admin =-");
  
} else {
 console.log("-= ADMIN: No Admin =-");
}


Accounts.config({
  sendVerificationEmail: true,
  forbidClientAccountCreation: false
});


Accounts.onCreateUser(function(options, user) {
  //CREATE NEW MYUSER OBJECT AND COPY ALL DEFAULT ATTRIBUTS TO IT
  const myUser = Object.assign({}, user);

  if (options.profile) {
    myUser.profile = options.profile;
  }
  // console.log(user);

  //CHECK & MERGE FACEBOOK INFO
  if (user.services.facebook) {
    const fb = user.services.facebook;
    console.log(fb);
    myUser.username = fb.name;
    myUser.emails = [{address: fb.email, verified: true}];
    myUser.avatar = `https://graph.facebook.com/${fb.id}/picture/?type=small`;
  }
  //CHECK & MERGE GOOGLE INFO
  if (user.services.google) {
    const gg = user.services.google;
    console.log(gg);
    myUser.username = gg.name;
    myUser.emails = [{address: gg.email, verified: true}];
    myUser.avatar = gg.picture;
  }
  console.log(myUser);
  //CHECK FOR SPECIFIC EMAILS & MAKE ADMINS

  return myUser;
});


Accounts.validateNewUser(function(user) {
    console.log('Checking for Existing E-mail...');
    const user_email = user.emails[0].address;
    let existing_user = Meteor.users.findOne({ 'services.facebook.email' : user_email}) || Meteor.users.findOne({ 'services.google.email' : user_email}) || Meteor.users.findOne({ 'emails.0.address' : user_email}) ;
    if (existing_user) {
      // login and merge data! 
      let provider;
      const cb = (Error) => { 
        Error ? console.log(Error) : console.log("All Good!")
      }
      if (existing_user.services.facebook) {
        provider = "Facebook";
      }
      if (existing_user.services.google) {
        provider = "Google";
      }
      console.log("User Exists Already");
      throw new Meteor.Error(500, `You've been here before! Login with ${provider}.`);
    } else {
      console.log("New User!");
      return true;
    }
});






// // this is for handling # in verifyEmail url
// (function () {
//     "use strict";
//     Accounts.urls.resetPassword = function (token) {
//         return Meteor.absoluteUrl('reset-password/' + token);
//     };
//     Accounts.urls.verifyEmail = function (token) {
//         return Meteor.absoluteUrl('verify-email/' + token);
//     };
//     Accounts.urls.enrollAccount = function (token) {
//         return Meteor.absoluteUrl('enroll-account/' + token);
//     };

// })();