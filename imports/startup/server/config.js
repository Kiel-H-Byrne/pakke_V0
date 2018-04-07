import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';


//check for settings file
console.log("-= Settings: Checking... =-");
if (!Meteor.settings.public.keys) {
    console.log("--------------= SETTINGS FAILED. (USE 'NPM RUN' INSTEAD OF 'METEOR' AT COMMAND LINE) =--------------");
}


const SOUP = Meteor.users.findOne({username: 'Soup'});
if (!SOUP) {
  console.log("CREATING FIRST USER: SOUP");
  const soupId = Accounts.createUser({
      "username": "Soup",
      "email": "soup@pakke.us",
      "password": "password",
  });
} else {
    // console.log(SOUP);
    // Roles.addUsersToRoles( Kiel._id ,  ["admin"] );
    // Meteor.call('addRole', SOUP._id, ['admin'])
    if (!Roles.userIsInRole(SOUP._id, ['admin']) ) {
      Roles.addUsersToRoles(SOUP._id, 'admin');
      Meteor.users.update(
        {_id: SOUP._id}, 
        {$set: {
          "profile.avatar": "/img/brand/PAKKE_circle.png",
          "profile.name": "Souper Youzer",
          }
        });

      // Roles.setUserRoles( SOUP._id , 'admin');
      console.log("-= ADMIN: 'Soup' is Admin =-");
    }
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

// Accounts.emailTemplates.enrollAccount.text = (user, url) => {
//   return 'You have been selected to participate in building a better future!'
//     + ' To activate your account, simply click the link below:\n\n'
//     + url;
// };

Accounts.emailTemplates.enrollAccount.text = (user, url) => {
  return `
  Welcome to Pakke ${user.profile.name}!

  Knowing this may be your first introduction to Pakke, we would like to start off with who we are but more importantly, what you will NOT find here. To start, our team isn’t one flavor of ice cream. Instead, think of us as a desert experience that rivals any fancy French restaurant but replace the stuffy waiter with Tina Fey, the cook with Anthony Bourdain and the pianist with Chance the Rapper. 

  So what are we not? We are not the crowded bar. Certainly not the restaurant that serves over-priced “squid pasta.” And more emphatically, we are not the art gallery or concert venue that reaps the overwhelming benefits from the artists talent. Pakke focuses on the experience because we know it doesn’t really matter where people gather, what’s important is what happens when they get there. Our goal is you will discover, connect and experience something new every time you attend a Pakke event. So first things first: get out there.

  Any questions, send us an email!

  Discover. Connect. Experience.

  To activate your account, simply click the link below:
      ${url}

  The Pakke Team 
  `
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