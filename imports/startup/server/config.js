import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
 
import '../collections/schemas';

//check for settings file
console.log("-= Settings: Checking... =-");
if (!Meteor.settings.public.keys) {
    console.log("--------------= SETTINGS FAILED. (USE 'NPM RUN' INSTEAD OF 'METEOR' AT COMMAND LINE) =--------------");
}


const SOUP = Meteor.users.findOne({username: 'PAKKE'});
if (!SOUP) {
  console.log("CREATING FIRST USER: PAKKE");
  const soupId = Accounts.createUser({
      "username": "PAKKE",
      "email": "noreply@pakke.us",
      "password": "pakkeP@RTY"
  });
} else {
    // console.log(SOUP);
    // Roles.addUsersToRoles( Kiel._id ,  ["admin"] );
    
    if (!Roles.userIsInRole(SOUP._id, ['admin']) ) {
      Roles.addUsersToRoles(SOUP._id, 'admin');
      Meteor.users.update(
        {_id: SOUP._id}, 
        {$set: {
          "profile.avatar": "/img/brand/SOCIAL/Logo_Facebook_mark_02.jpg",
          "profile.name": "PAKKE",
          }
        });

      // Roles.setUserRoles( SOUP._id , 'admin');
      console.log("-= ADMIN: 'PAKKE' is Admin =-");
    }
}

Accounts.config({
  sendVerificationEmail: true
});

Accounts.onCreateUser(function(options, user) {
  //CREATE NEW MYUSER OBJECT AND COPY ALL DEFAULT ATTRIBUTS TO IT

  let myUser = Object.assign({}, user);

  if (options.profile) {
    myUser.profile =  Schema.Profile.clean(options.profile);
  }
    // console.log(user);

  //CHECK & MERGE FACEBOOK INFO
  if (user.services.facebook) {
    const fb = user.services.facebook;
    if (!fb.email) {return null}
    console.log(fb);
    myUser.username = fb.name;
    myUser.emails = [{address: fb.email, verified: true}];
    // myUser.profile.avatar = `https://graph.facebook.com/${fb.id}/picture/?type=large`;
    (fb.picture.data.is_silhouette == false) ? myUser.profile.avatar = fb.picture.data.url : null
    myUser.profile.birthDate = new Date(fb.birthday) || null;
  }
  //CHECK & MERGE GOOGLE INFO
  if (user.services.google) {
    const gg = user.services.google;
    if (!gg.email) {return null}
    console.log(gg);
    myUser.username = gg.name;
    myUser.emails = [{address: gg.email, verified: true}];
    myUser.profile.avatar = gg.picture;
  }
  // console.log(myUser);
  return myUser;
});


Accounts.validateNewUser(function(user) {
    console.log('Checking for Existing E-mail...');
    if (user && user.emails) {
      const user_email = user.emails[0].address;
      const existing_user = Accounts.findUserByEmail(user_email);
      let crmParams = {};

      if (existing_user) {
        // login and merge data! 
        let provider;

        if (existing_user.services.facebook) {
          provider = "Facebook";
        }
        if (existing_user.services.google) {
          provider = "Google";
        }
        console.log("User Exists Already");
        throw new Meteor.Error(500, `You've been here before! Login with ${provider}.`);
      } else {
        console.log(`-= NEW USER: ${user_email}=- `);
        if (Meteor.isProduction) {
          if (user.services.facebook) {
            crmParams = {
              "Last Name":user.services.facebook.last_name,
              "First Name":user.services.facebook.first_name,
              "Email": user_email,
              "Lead Source": "Facebook Signup"
            };
            switch (user.services.facebook.gender) {
              case "female":
                crmParams["Salutation"] = "Ms.";
                break;
              case "male":
                crmParams["Salutation"] = "Mr.";
            };
          }
          if (user.services.google) {
            crmParams = {
              'Last Name' : user.services.google.family_name,
              'First Name' : user.services.google.given_name,
              'Email' : user_email,
              "Lead Source": "Google Signup"
            }
          }
          

         Meteor.call('crmInsert', 'leads', crmParams); 
       }
        
        return true;
      }
    } else {
      throw new Meteor.Error(403, 'There must be an e-mail address associated with this account.');
    }
});

// Accounts.onLogin(function(user) {
//   console.log(user);
//   Meteor.call('identifyUser', user);
// });

// =========================== EMAIL TEMPLATES ================================

Accounts.emailTemplates.siteName = 'PAKKE.us';
Accounts.emailTemplates.from = 'PAKKE.us <noreply@pakke.us>';

Accounts.emailTemplates.enrollAccount.subject = (user) => {
  return `Welcome to PAKKE!, ${user.profile.name}`;
};

Accounts.emailTemplates.enrollAccount.text = (user, url) => {
  return `
  Welcome to PAKKE ${user.profile.name}!

  Knowing this may be your first introduction to PAKKE, we would like to start off with who we are but more importantly, what you will NOT find here. To start, our team isn’t one flavor of ice cream. Instead, think of us as a desert experience that rivals any fancy French restaurant but replace the stuffy waiter with Tina Fey, the cook with Anthony Bourdain and the pianist with Chance the Rapper. 

  So what are we not? We are not the crowded bar. Certainly not the restaurant that serves over-priced “squid pasta.” And more emphatically, we are not the art gallery or concert venue that reaps the overwhelming benefits from the artists talent. PAKKE focuses on the experience because we know it doesn’t really matter where people gather, what’s important is what happens when they get there. Our goal is you will discover, connect and experience something new every time you attend a PAKKE event. So first things first: get out there.

  Any questions, send us an email!

  Discover. Connect. Experience.

  To activate your account, simply click the link below:
      ${url}

  The PAKKE Team 
  `
};

Accounts.emailTemplates.resetPassword.from = () => {
  // Overrides the value set in `Accounts.emailTemplates.from` when resetting
  // passwords.
  return 'PAKKE.us Password Reset <noreply@pakke.us>';
};
Accounts.emailTemplates.verifyEmail = {
   subject() {
      return "Activate your PAKKE account now!";
   },
   text(user, url) {
      return `Hey ${user.profile.name}! Verify your e-mail by following this link: ${url}`;
   }
};