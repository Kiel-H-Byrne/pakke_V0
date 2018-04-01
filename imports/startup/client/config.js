import { Accounts } from 'meteor/accounts-base';

Accounts.ui.config({
  requestPermissions: {
    facebook: ["user_birthday", "user_location", "user_education_history", "user_work_history", "user_actions.music"],
    google: ["userinfo.profile", "user.addresses.read", "user.birthday.read", "user.phonenumbers.read"]
  },
  requestOfflineToken: {
    google: true
  },
  passwordSignupFields: 'EMAIL_ONLY'
});


// Facebook: http://developers.facebook.com/docs/authentication/permissions/
// Google: https://developers.google.com/identity/protocols/googlescopes