import { Accounts } from 'meteor/accounts-base';

Meteor.startup(() => {
    //=====  HTML Attributes for Facebook opengraph api =====
  $('html').attr({
    'xmlns': 'https://www.w3.org/1999/xhtml',
    'xmlns:fb': 'https://ogp.me/ns/fb#',
    'lang': 'en'
  });
  
  if (location.host.indexOf('www.pakke.us') !== 0) {
    console.log('redirecting...');
      location.replace("https://www.pakke.us")
  }

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('/sw.js').then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }).catch(function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }
});


Accounts.ui.config({
  requestPermissions: {
    facebook: ["user_birthday", "user_location"],
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

Accounts.onLoginFailure(function(error) {
  Bert.alert(error.error.reason, "info", "growl-top-right")
});

// Facebook: http://developers.facebook.com/docs/authentication/permissions/
// Google: https://developers.google.com/identity/protocols/googlescopes