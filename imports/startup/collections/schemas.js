import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';

import SimpleSchema from 'simpl-schema';
import uniforms from 'uniforms';
// import ImageUpload from '../../client/ImageUpload';

Schema = {};

class ImageUploadComponent extends Component {
  render() {
    return (
      <div><input type="file" /></div>
    );
  }
};


Schema.Address = new SimpleSchema({
   // address: {
  //   type: String,
  //   optional: true,
  //   // custom: function() {
  //   //   //if street has no value and isSet(), and this has no value, throw error 
  //   //   const hasStreet = this.field('street').isSet ;
  //   //   if (!hasStreet) {
  //   //     console.log('no street');
  //   //     // inserts
  //   //     if (!this.operator) {
  //   //       if (!this.isSet || this.value === null || this.value === "") return "required";
  //   //     }

  //   //     // updates
  //   //     else if (this.isSet) {
  //   //       console.log('street is set');
  //   //       if (this.operator === "$set" && this.value === null || this.value === "") return "required";
  //   //       if (this.operator === "$unset") return "required";
  //   //       if (this.operator === "$rename") return "required";
  //   //     }
  //   //   } else {
  //   //     console.log('or else what??');
  //   //     let addressString =  `${this.field('street').value} ${this.field('city').value}, ${this.field('state').value} ${this.field('zip').value}`;
        
  //   //     // let el = $('input[name="address")')[0];
  //   //     this.value = addressString;
  //   //     return {$set: addressString};
  //   //   }
  //   //   return;
  //   // },
  //   autoValue: function() {
  //     if ( (this.isInsert || this.isUpdate) && this.field('street').isSet) {
  //       let addressString =  `${this.field('street').value} ${this.field('city').value}, ${this.field('state').value} ${this.field('zip').value}`;
  //       return addressString;
  //     }
  //   }
  // },
  street: {
    type: String,
    max: 100,
  },
  place: {
    type: String,
    max: 30,
    label: 'Apt. #, Floor #, Suite #',
    // allowedValues: ["APT", "FL", "STE"]
    optional: true
  },
  city: {
    type: String,
    max: 50,
    // defaultValue: 'District of Columbia'
  },
  state: {
    type: String,
    allowedValues: ["AL","AK","AZ","AR","CA","CO","CT","DC","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"],
    defaultValue: 'DC'
  },
  zip: {
    type: String,
    regEx: SimpleSchema.RegEx.ZipCode,
    optional: true
  },
  // country: {
  //   type: String,
  //   min: 2,
  //   max: 3,
  //   optional: true,
  //   defaultValue: 'US'
  // },
  coords: {
    type: String,
    optional: true,
    // uniforms: {
    //   disabled: true,
    //   hidden: true
    // },
    autoValue: function () {
      // const address = this.field("address").value;
      if (this.siblingField('street').value) {
        let street = this.siblingField("street").value;
        let addressString =  `${this.siblingField('street').value}, ${this.siblingField('state').value} ${this.siblingField('zip').value}`;
        // console.log(addressString);
        //CLIENT SIDE GEOCODE
        // const geo = new google.maps.Geocoder;
        // geo.geocode(
        //   { address: addressString },
        //   (res,err) => {
        //     console.log(res,err);
        //     let locObj = res[0].geometry.location;
        //     let locStr = `${locObj.lat()}, ${locObj.lng()}`
        //     if (locStr) {
        //       return locStr;  
        //     }
        //   });

        //SERVER SIDE GEOCODE
        const response = Meteor.call('geoCode', addressString);


        if (response && response.results.length) {
          const loc =response.results[0].geometry.location;
          // ====== RETURN STRINGIFIED LAT/LONG NUMBERS ======
          const arr =  _.values(loc);
          const locationString = arr.toLocaleString();
          console.log(locationString);
          // this.value = locationString;
          // console.log(this.value);
          return locationString;
        }
      // } else {
      //   console.log("Street is required");
      }
    }
  }  
});

Schema.Venue = new SimpleSchema({
  nickname: {
    type: String,
    label: 'A Nickname'
  },
  description: {
    type: String,
    label: "A brief description:",
    max: 240
  },
  address: {
    type: Schema.Address,
    label: "Where is it?"
  },
  venueType: { 
    type: String,
    label: 'What type of venue is this?',
    allowedValues: ["Commercial", "Apartment", "Condo", "Town Home", "Detached Home"],
    optional: true
  },
  capacity: {
    type: Number,
    label: "How many people can comfortably fit?",
    max: 99
  },
  ownedStatus: {
    type: Boolean,
    label: 'I own this venue.',
    optional: true
  },
  images: {
    type: Array,
    optional: true,
  },
  'images.$': {
    type: Object,
    optional: true,
    uniforms: ImageUploadComponent
  },
  // 'images.$.url': {
  //   type: String
  // }

});

Schema.asHost = new SimpleSchema({
  venues: {
    type: Array,
    label: 'Add A New Venue!',
    optional: true
  },
  "venues.$": {
    type: Schema.Venue,
    optional: true
  }
});

Schema.asGuest = new SimpleSchema({
  //the editable profile
  preferences: {  
    type: String,
    label: 'What do you look for in a "fun time"? ',
    optional: true
  }
});

Schema.Talent = new SimpleSchema({
  talentType: {
    type: String,
    label: 'How do you entertain?',
  },
  experience: {
    type: String,
    label: 'How long have you done this?',
    optional: true
  },
  audienceSize: {
    type: String,
    label: 'Preferred audience size?',
    optional: true
  },
  fee: {
    type: SimpleSchema.Integer,
    label: 'Fee for this performance?',
    optional: true
  }
});

Schema.asTalent = new SimpleSchema({
  name: {
    type: String,
    label: 'Stage Name?',
    optional: true
  },
  talents: {
    type: Array
  },
  "talents.$": {
    type: Schema.Talent,
    optional: true
  }
});


Schema.Interests = new SimpleSchema({
  whichAnimal: {
    type: String,
    label: 'Which are you?',
    allowedValues: ["Inside Cat", "Outside Cat", "Dog rolling around in mud"],
    optional: true
  },
  summerDestination: {
    type: String,
    label: 'Where could we find you on a summer Saturday?',
    allowedValues: ["Rooftop Pool", "Mountaintop Waterfall", "Nude Beach"],
    optional: true
  },
  monstersInc: {
    type: String,
    label: 'Which Monsters Inc character are you?',
    allowedValues: ["James P. Sullivan", "Mike Wazowski", "Boo"],
    optional: true
  },
  everMotorcycle: {
    type: Boolean,
    label: 'Have you ever ridden a motorcycle?',
    optional: true
    },
  everGarden: {
    type: Boolean,
    label: 'Have you ever planted a garden?',
    optional: true
    },
  everMarathon: {
    type: Boolean,
    label: 'Have you ever entered a marathon?',
    optional: true
    },
  everClimb: {
    type: Boolean,
    label: 'Have you ever gone mountain climbing?',
    optional: true
    },
  everGreek: {
    type: Boolean,
    label: 'Have you ever been a member of a sorority/fraternity?',
    optional: true
    },
  everCrossdress: {
    type: Boolean,
    label: 'Have you ever dressed up as a member of the opposite sex?',
    optional: true
    },
  everMilitary: {
      type: Boolean,
      label: 'Have you ever been in the military?',
      optional: true
    },
  ratherLottery: {
      type: String,
      label: 'Would you rather:',
      allowedValues: ['Win a million dollars in the lottery.', 'Never pay for anything again.'],
      optional: true
    },
  ratherAge: {
      type: String,
      label: 'Would you rather:',
      allowedValues: ['Age from the neck up only.', 'Age from the neck down only.'],
      optional: true
    },
  ratherWishes: {
      type: String,
      label: 'Would you rather:',
      allowedValues: ['Have 3 wishes in 10 years.', 'Have 1 wish today.'],
      optional: true
    },
  ratherLove: {
      type: String,
      label: 'Would you rather:',
      allowedValues: ['Never have sex.', 'Never find true love.'],
      optional: true
    },
  ratherNeighbor: {
      type: String,
      label: 'Would you rather:',
      allowedValues: ['Have a noisy neighbor.', 'Have a nosy neighbor.'],
      optional: true
    },
  ratherFly: {
      type: String,
      label: 'Would you rather:',
      allowedValues: ['Be able to fly.', 'Be able to become invisible.'],
      optional: true
    },
  ratherTalk: {
      type: String,
      label: 'Would you rather:',
      allowedValues: ['Talk in rhyme, all the time.', 'Sing instead of speak.'],
      optional: true
    },
  ratherLive: {
      type: String,
      label: 'Would you rather:',
      allowedValues: ['Live out in the country.', 'Live in the city.'],
      optional: true
    },
  ratherSize: {
      type: String,
      label: 'Would you rather:',
      allowedValues: ['Be a giant mouse.', 'Be a tiny elephant.'],
      optional: true
    },
});

Schema.Profile = new SimpleSchema({
  name: {
    type: String,
    optional: true
  },
  birthDate: {
      type: Date,
      label: 'Enter your Age:',
      optional: true,
      autoValue: function() {
        // check for two digits, calculate birthdate, save as date format.
      }
  },
  avatar: {
    type: String,
    optional: true,
    uniforms: ImageUploadComponent
  },
  address: {
    type: Schema.Address,
    optional: true
  },
  bio: {
    type: String,
    label: 'Bio',
    optional: true,
    max: 280
  },
  social: {
    type: Object,
    optional: true,
    label: 'Social Media'
  },
  'social.facebook': {
    type: String,
    optional: true,
    label: 'Facebook Handle'
  },
    'social.instagram': {
    type: String,
    optional: true,
    label: 'Instagram Handle'
  },
    'social.twitter': {
    type: String,
    optional: true,
    label: 'Twitter Handle'
  },
  profession: {
    type: String,
    optional: true,
  },
  interests: {
    type: Schema.Interests,
    optional: true,
  },
  asHost: {
    type: Schema.asHost,
    optional: true
  },
  asGuest: {
    type: Schema.asGuest,
    optional: true
  },
  asTalent: {
    type: Schema.Talent,
    optional: true
  }  
});

Schema.User = new SimpleSchema({
    username: {
        type: String,
        // For accounts-password, either emails or username is required, but not both. It is OK to make this
        // optional here because the accounts-password package does its own validation.
        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
        optional: true
    },
    emails: {
        type: Array,
        // For accounts-password, either emails or username is required, but not both. It is OK to make this
        // optional here because the accounts-password package does its own validation.
        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
        optional: true
    },
    "emails.$": {
        type: Object
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    // Use this registered_emails field if you are using splendido:meteor-accounts-emails-field / splendido:meteor-accounts-meld
    registered_emails: {
        type: Array,
        optional: true
    },
    'registered_emails.$': {
        type: Object,
        blackbox: true
    },
    createdAt: {
        type: Date
    },
    profile: {
        type: Schema.Profile,
        optional: true
    },
    // Make sure this services field is in your schema if you're using any of the accounts packages
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    // Add `roles` to your schema if you use the meteor-roles package.
    // Option 1: Object type
    // If you specify that type as Object, you must also specify the
    // `Roles.GLOBAL_GROUP` group whenever you add a user to a role.
    // Example:
    // Roles.addUsersToRoles(userId, ["admin"], Roles.GLOBAL_GROUP);
    // You can't mix and match adding with and without a group since
    // you will fail validation in some cases.
    // roles: {
    //     type: Object,
    //     optional: true,
    //     blackbox: true
    // },
    // Option 2: [String] type
    // If you are sure you will never need to use role groups, then
    // you can specify [String] as the type
    roles: {
        type: Array,
        optional: true
    },
    'roles.$': {
        type: String
    },
    // In order to avoid an 'Exception in setInterval callback' from Meteor
    heartbeat: {
        type: Date,
        optional: true
    },
    eventsHosted: {
      type: Array,
      optional: true
    },
    "eventsHosted.$": {
      type: String,
      optional: true
    },
    eventsAttended: {
      type: Array,
      optional: true
    },
    "eventsAttended.$": {
      type: String,
      optional: true
    },
    eventsEntertained: {
      type: Array,
      optional: true
    },
    "eventsEntertained.$": {
      type: String,
      optional: true
    }        
});
 
// Meteor.users.attachSchema(Schema.User);

Schema.Event = new SimpleSchema({

  // We use `label` to put a custom label for this form field
  // Otherwise it would default to `Title`
  // 'optional: false' means that this field is required
  // If it's blank, the form won't submit and you'll get a red error message
  // 'type' is where you can set the expected data type for the 'title' key's value
  hostId: {
    type: String,
    autoValue: () => Meteor.userId()
  },
  date: {
    type: Date
  },
  size: {
    type: Number,
    min: 7,
    max: 99
  },
  byline: {
    type: String,
    label: 'Event Name',
    max: '33'
  },
  image: {
    type: String,
    optional: true,
    uniforms: ImageUploadComponent,
    label: 'Preview Image'
  },
  description: {
    type: String,
    label: 'Event Description',
    optional: true,
    max: 120
  },
  price: {
    type: SimpleSchema.Integer,
    min: 5,
    max: 200
  },
  eventAddress: {
    type: Schema.Address,
    label: 'Event Address'
  },
  venueId: {
    type: String,
    optional: true
    //SOMEHOW SHOW RADIO BOXES WITH NAMES OF VENUES FROM HOSTS VENUEARRAY
  },
  contact: {
    type: String,
    label: 'Contact Number',
    max: 15,
    optional: true
  },
  categories: {
    type: Array,
    label: 'Categories',
    optional: true
  },
  'categories.$': {
    type: String
  },
  guests: {
    type: Object,
    optional: true
  },
  'guests.applied': {
    type: Array,
    optional: true
  },
  'guests.invited': {
    type: Array,
    optional: true
  },
  'guests.confirmed': {
    type: Array,
    optional: true
  },
  'guests.applied.$': {
    //stores array of guest_ids; which can be used for search later.
    type: String
  },
  'guests.invited.$': {
    //stores array of guest_ids; which can be used for search later.
    type: String
  },
  'guests.confirmed.$': {
    //stores array of guest_ids; which can be used for search later.
    type: String
  },
  entertainers: {
    type: Array,
    optional: true
  },
  "entertainers.$": {
    type: String,
    optional: true
  },
  submitted: {
    type: Date,
    autoValue: () => new Date()
  }, 
  featured: {
    type: Boolean, 
    optional: true,
    defaultValue: false,
    label: 'Featured Event',
    uniforms: {
      hidden: true
    },
  }
});

