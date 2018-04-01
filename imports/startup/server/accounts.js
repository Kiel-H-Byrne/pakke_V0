import { Accounts } from 'meteor/accounts-base';

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
    console.log(user.services.facebook);
    myUser.username = user.services.facebook.name;
    myUser.emails = [{address: user.services.facebook.email, verified: true}];
    myUser.avatar = `https://graph.facebook.com/${user.services.facebook.id}/picture/?type=small`;

  }
  //CHECK & MERGE GOOGLE INFO
  if (user.services.google) {
    console.log(user.services.google);
    myUser.username = user.services.google.name;
    myUser.emails = [{address: user.services.google.email, verified: true}];
    myUser.avatar = user.services.google.picture;

  }
  console.log(myUser);
  //CHECK FOR SPECIFIC EMAILS & MAKE ADMINS

  return myUser;
});