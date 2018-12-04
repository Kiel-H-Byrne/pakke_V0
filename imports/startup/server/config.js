import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
 
import '../collections/schemas';

//check for settings file
console.log("-= Settings: Checking... =-");
if (!Meteor.settings.public.keys) {
    console.log("--------------= SETTINGS FAILED. (USE 'NPM RUN' INSTEAD OF 'METEOR' AT COMMAND LINE) =--------------");
}

ServiceConfiguration.configurations.upsert({
  service: "facebook"
},{
  $set: {
    loginStyle: "popup",
    appId: Meteor.settings.public.keys.facebookOAuth.app_id,
    secret: Meteor.settings.public.keys.facebookOAuth.app_secret
  }
});

ServiceConfiguration.configurations.upsert({
  service: "google"
},{
  $set: {
    loginStyle: "popup",
    clientId: Meteor.settings.public.keys.googleOAuth.client_id,
    secret: Meteor.settings.public.keys.googleOAuth.client_secret
  }
});


const SOUP = Meteor.users.findOne({username: 'PAKKE'});
if (!SOUP) {
  console.log("CREATING FIRST USER: PAKKE");
  const soupId = Accounts.createUser({
      "username": "PAKKE",
      "email": "noreply@pakke.us",
      "password": "pakkeP@RTY",
      "profile": {}
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
  //LOGIN METHOD NEEDS TO ACCOUNT FOR EACH TYPE, FB, GOOGLE, EMAIL, ETC...

  let myUser = Object.assign({}, user);
  myUser.profile = {}
  if (options.profile) {
    myUser.profile =  Schema.Profile.clean(options.profile);
  }
  //IF USERNAME EXISTS, APPEND A NUMBER TO IT TO MAKE IT UNIQUE


  //CHECK & MERGE FACEBOOK INFO
  if (user.services.facebook) {
    const fb = user.services.facebook;
    if (!fb.email) {return null}
    // console.log(fb);
    if (Accounts.findUserByUsername(fb.name)) {
      myUser.username = fb.name + fb.name.charAt(3);
    } else {
      myUser.username = fb.name;
    }
    myUser.emails = [{address: fb.email, verified: true}];
    
    // (fb.picture.data.is_silhouette == false) ? myUser.profile.avatar = fb.picture.data.url : myUser.profile.avatar = "/img/holders/default-avatar.jpg"
    if (!fb.picture.data.is_silhouette) {
      myUser.profile.avatar = `https://graph.facebook.com/${fb.id}/picture/?type=large`
    } else {myUser.profile.avatar = "/img/holders/default-avatar.jpg"}

    myUser.profile.birthDate = new Date(fb.birthday) || null;
  }
  //CHECK & MERGE GOOGLE INFO
  if (user.services.google) {
    const gg = user.services.google;
    if (!gg.email) {return null}
    // console.log(gg);
    if (Accounts.findUserByUsername(gg.name)) {
      myUser.username = gg.name + gg.name.charAt(3);
    } else {
      myUser.username = gg.name;
    }
    myUser.emails = [{address: gg.email, verified: true}];
    myUser.profile.avatar = gg.picture || "/img/holders/default-avatar.jpg";
  }
  // console.log(myUser);
  if (!user.services) {
    // Meteor.call('bertAlert', "Verification E-mail Sent!", "success")
  }
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
        let provider = "your E-mail Address";

        if (existing_user.services.facebook) {
          provider = "Facebook";
          // Meteor.loginWithFacebook({

          // }, (error) => {
          //   console.log(error)
          // })
        }
        if (existing_user.services.google) {
          provider = "Google";
          // Meteor.loginWithGoogle({
          //   loginHint: user_email
          // }, (error) => {
          //   console.log(error)
          // })
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


Accounts.validateLoginAttempt(function (data) {
  // console.log(data)
  if (!data.allowed) {
    throw new Meteor.Error(data.error.error, data.error.reason);
    return false
  };
  if (data.type == 'resume') return true;

    if (data.methodName == 'createUser') {
      const diff = new Date() - new Date(data.user.createdAt)
      if (diff < 2000) {
        // console.info('New User, denying autologin. Must verify first');
        // Bert.alert("", 
      // "pk-success", "growl-top-right", "fa-thumbs-up", )
      throw new Meteor.Error(500, "Check your inbox for a sign-in link!")
        return false;
      } else {
        return true
      }
    }

})


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
      return `
      Hi there! 

      Thank you for registering with PAKKE.us.

      Please verify your e-mail address by following this link: 
      ${url}
      `;
   }
};