import { Accounts } from 'meteor/accounts-base';

Accounts.ui.config({
  requestPermissions: {
    facebook: ["user_birthday", "user_location", "user_education_history", "user_work_history", "user_actions.music"],
    google: [
    "https://www.googleapis.com/auth/userinfo.profile", 
    "https://www.googleapis.com/auth/user.addresses.read", 
    "https://www.googleapis.com/auth/user.birthday.read", 
    "https://www.googleapis.com/auth/user.phonenumbers.read"
    ]
  },
  requestOfflineToken: {
    google: true
  },
  passwordSignupFields: 'EMAIL_ONLY'
});

Accounts.onLoginFailure(function(Error) {

  throw new Meteor.Error(Error.message);
});

// Facebook: http://developers.facebook.com/docs/authentication/permissions/
// Google: https://developers.google.com/identity/protocols/googlescopes