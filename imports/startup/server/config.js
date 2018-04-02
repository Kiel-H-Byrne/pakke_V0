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
      "username": "Soup",
      "email": "soup@pakke.us",
      "password": "password",
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
    Meteor.users.update(
      {_id: SOUP._id}, 
      {$set: {
        "profile.avatar": "/img/brand/PAKKE_circle.png",
        "profile.name": "Souper Youzer",
        "profile.firstName": "Souper",
        "profile.lastName": "Youzer"
        }
      });

    // Roles.setUserRoles( SOUP._id , 'admin');
    console.log("-= ADMIN: 'Soup' is Admin =-");
  
} else {
 console.log("-= ADMIN: No Admin =-");
}


Accounts.config({
  sendVerificationEmail: true,
  forbidClientAccountCreation: false
});

Accounts.emailTemplates.siteName = 'pakke.us';
Accounts.emailTemplates.from = 'pakke.us <noreply@pakke.us>';

Accounts.emailTemplates.enrollAccount.subject = (user) => {
  return `Welcome to pakke!, ${user.profile.name}`;
};

Accounts.emailTemplates.enrollAccount.text = (user, url) => {
  return 'You have been selected to participate in building a better future!'
    + ' To activate your account, simply click the link below:\n\n'
    + url;
};

Accounts.emailTemplates.resetPassword.from = () => {
  // Overrides the value set in `Accounts.emailTemplates.from` when resetting
  // passwords.
  return 'pakke.us Password Reset <noreply@pakke.us>';
};
Accounts.emailTemplates.verifyEmail = {
   subject() {
      return "Activate your pakke account now!";
   },
   text(user, url) {
      return `Hey ${user}! Verify your e-mail by following this link: ${url}`;
   }
};

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
    myUser.profile.avatar = `https://graph.facebook.com/${fb.id}/picture/?type=small`;
  }
  //CHECK & MERGE GOOGLE INFO
  if (user.services.google) {
    const gg = user.services.google;
    console.log(gg);
    myUser.username = gg.name;
    myUser.emails = [{address: gg.email, verified: true}];
    myUser.profile.avatar = gg.picture;
  }
  // console.log(myUser);
  //CHECK FOR SPECIFIC EMAILS & MAKE ADMINS

  return myUser;
});


Accounts.validateNewUser(function(user) {
    console.log('Checking for Existing E-mail...');
    const user_email = user.emails[0].address;
    const existing_user = Accounts.findUserByEmail(user_email)
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
      //SEND EMAIL! 
      // Accounts.sendEnrollmentEmail(user._id, user_email);
        // user object doesnt exist yet, so no email sent.
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