import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Random } from 'meteor/random';
import SimpleSchema from 'simpl-schema';
import uniforms from 'uniforms';
import filterDOMProps from 'uniforms/filterDOMProps';

import VenueImages from './VenueImages'
import EventImages from './EventImages'

if (Meteor.isClient) {
import UploadField from '/imports/client/forms/UploadField.js';
import FileUpload from '/imports/client/forms/FileUpload.js';
import AvatarUpload from '/imports/client/forms/AvatarUpload.js';
import VenueImagesUpload from '/imports/client/forms/VenueImagesUpload.js';
import EventImagesUpload from '/imports/client/forms/EventImagesUpload.js';

import VenuesForm from '/imports/client/forms/VenuesForm.js';
}

Schema = {};


filterDOMProps.register('unique');


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
});

Schema.Venue = new SimpleSchema({
  venueId: {
    type: String,
    autoValue: () => Random.id()
  },
  nickname: {
    type: String,
    unique: true,
    label: 'Give this venue a nickname.'
  },
  description: {
    type: String,
    label: "What's it like?:",
    max: 240
  },
  address: {
    type: Schema.Address,
    unique: true,
    label: "Where is this place?"
  },
  venueType: { 
    type: String,
    label: 'Type:',
    allowedValues: ["Retail", "Apartment", "Condo", "Town Home", "Detached Home", "Other"],
    optional: true
  },
  capacity: {
    type: SimpleSchema.Integer,
    label: "How many people can comfortably fit?",
    max: 99
  },
  ownedStatus: {
    type: Boolean,
    label: 'I own this venue.',
    optional: true,
    defaultValue: false
  },
  images: {
    type: Object,
    blackbox: true,
    optional: true,
    uniforms: Meteor.isClient ? {
      label: "Images of this place.",
      component: Meteor.isClient ? AvatarUpload : null,
      collection: VenueImages
    } : null
  }
});

Schema.Talent = new SimpleSchema({
  talentId: {
    type: String,
    autoValue: () => Random.id()
  },
  name: {
    type: String,
    label: 'Stage Name?',
    unique: true,
    optional: true
  },
  talentType: {
    type: String,
    unique: true,
    label: 'How do you entertain a crowd?',
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
    type: Number,
    label: 'Fee for this performance?',
    uniforms: {
      step: 0.10
    },
    optional: true
  }
});

Schema.Insight = new SimpleSchema({
  experiences: {
    type: String,
    label: 'Experiences you love?',
    optional: true
  },
  // grewUpOn: {
  //   type: String,
  //   label: 'You grew up on?',
  //   optional: true
  // },
  inspiration: {
    type: String,
    label: 'Someone alive today who deeply inspires you:',
    optional: true
  },
  favoriteSpace: {
    type: String,
    label: 'Your favorite space in the city?',
    optional: true
  },
  awesome: {
    type: String,
    label: 'Something awesome you would love to see happen in DC:',
    optional: true
  },
  book: {
    type: String,
    label: 'Most influential book or Ted Talk:',
    optional: true
  },
})

Schema.Interests = new SimpleSchema({
  localArtist: {
    type: String,
    label: 'Who is your favorite local artist right now?',
    optional: true
  },
  yearAhead: {
    type: String,
    label: 'What is something you would like to learn in the year ahead?',
    optional: true
  },
  localBetter: {
    type: String,
    label: 'What would make this city better?',
    optional: true
  },
  // whichAnimal: {
  //   type: String,
  //   label: 'Which are you?',
  //   allowedValues: ["Inside Cat", "Outside Cat", "Dog rolling around in mud"],
  //   optional: true
  // },
  // summerDestination: {
  //   type: String,
  //   label: 'Where could we find you on a summer Saturday?',
  //   allowedValues: ["Rooftop Pool", "Mountaintop Waterfall", "Nude Beach"],
  //   optional: true
  // },
  // monstersInc: {
  //   type: String,
  //   label: 'Which Monsters Inc character are you?',
  //   allowedValues: ["James P. Sullivan", "Mike Wazowski", "Boo"],
  //   optional: true
  // },
  // everMotorcycle: {
  //   type: Boolean,
  //   label: 'Have you ever ridden a motorcycle?',
  //   optional: true,
  //   defaultValue: false
  //   },
  // everGarden: {
  //   type: Boolean,
  //   label: 'Have you ever planted a garden?',
  //   optional: true,
  //   defaultValue: false
  //   },
  // everMarathon: {
  //   type: Boolean,
  //   label: 'Have you ever entered a marathon?',
  //   optional: true,
  //   defaultValue: false
  //   },
  // everClimb: {
  //   type: Boolean,
  //   label: 'Have you ever gone mountain climbing?',
  //   optional: true,
  //   defaultValue: false
  //   },
  // everGreek: {
  //   type: Boolean,
  //   label: 'Have you ever been a member of a sorority/fraternity?',
  //   optional: true,
  //   defaultValue: false
  //   },
  // everCrossdress: {
  //   type: Boolean,
  //   label: 'Have you ever dressed up as a member of the opposite sex?',
  //   optional: true,
  //   defaultValue: false
  //   },
  // everMilitary: {
  //     type: Boolean,
  //     label: 'Have you ever been in the military?',
  //     optional: true,
  //   defaultValue: false
  //   },
  // ratherLottery: {
  //     type: String,
  //     label: 'Would you rather:',
  //     allowedValues: ['Win a million dollars in the lottery.', 'Never pay for anything again.'],
  //     optional: true
  //   },
  // ratherAge: {
  //     type: String,
  //     label: 'Would you rather:',
  //     allowedValues: ['Age from the neck up only.', 'Age from the neck down only.'],
  //     optional: true
  //   },
  // ratherWishes: {
  //     type: String,
  //     label: 'Would you rather:',
  //     allowedValues: ['Have 3 wishes in 10 years.', 'Have 1 wish today.'],
  //     optional: true
  //   },
  // ratherLove: {
  //     type: String,
  //     label: 'Would you rather:',
  //     allowedValues: ['Never have sex.', 'Never find true love.'],
  //     optional: true
  //   },
  // ratherNeighbor: {
  //     type: String,
  //     label: 'Would you rather:',
  //     allowedValues: ['Have a noisy neighbor.', 'Have a nosy neighbor.'],
  //     optional: true
  //   },
  // ratherFly: {
  //     type: String,
  //     label: 'Would you rather:',
  //     allowedValues: ['Be able to fly.', 'Be able to become invisible.'],
  //     optional: true
  //   },
  // ratherTalk: {
  //     type: String,
  //     label: 'Would you rather:',
  //     allowedValues: ['Talk in rhyme, all the time.', 'Sing instead of speak.'],
  //     optional: true
  //   },
  // ratherLive: {
  //     type: String,
  //     label: 'Would you rather:',
  //     allowedValues: ['Live out in the country.', 'Live in the city.'],
  //     optional: true
  //   },
  // ratherSize: {
  //     type: String,
  //     label: 'Would you rather:',
  //     allowedValues: ['Be a giant mouse.', 'Be a tiny elephant.'],
  //     optional: true
  //   },
});

Schema.Profile = new SimpleSchema({
  name: {
    type: String,
    optional: true
  },
  birthDate: {
      type: Date,
      label: 'Enter your Birthday:',
      optional: true,
      autoValue: function() {
        // check for two digits, calculate birthdate, save as date format.
      }
  },
  avatar: {
    type: String,
    optional: true,
    label: 'Change your Avatar',
    uniforms: Meteor.isClient ? AvatarUpload : null
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
  interests: {
    type: Schema.Insight,
    optional: true,
  },
  venues: {
    type: Array,
    label: 'Add A New Venue!',
    optional: true,
    defaultValue: []
  },
  "venues.$": {
    type: Schema.Venue
  },
  talents: {
    type: Array,
    label: 'Add A New Talent!',
    optional: true,
    defaultValue: []
  },
  "talents.$": {
    type: Schema.Talent
  }
});

Schema.User = new SimpleSchema({
    username: {
        type: String,
        // For accounts-password, either emails or username is required, but not both. It is OK to make this
        // optional here because the accounts-password package does its own validation.
        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
        // optional: true
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
      optional: true,
      defaultValue: []
    },
    "eventsHosted.$": {
      type: String
    },
    eventsAttended: {
      type: Array,
      optional: true,
      defaultValue: []
    },
    "eventsAttended.$": {
      type: String
    },
    eventsEntertained: {
      type: Array,
      optional: true,
      defaultValue: []
    },
    "eventsEntertained.$": {
      type: String
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
  duration: {
    type: Number,
    min: 2,
    max: 12,
    uniforms: {
      step: 0.50
    },
  },
  size: {
    type: SimpleSchema.Integer,
    min: 7,
    max: 99
  },
  byline: {
    type: String,
    unique: true,
    label: 'Event Name',
    max: '33'
  },
  image: {
    type: String,
    optional: true,
    uniforms: {
      component: (Meteor.isClient ? EventImagesUpload : null),
      collection: EventImages
    },
    label: 'Event Preview Image'
  },
  description: {
    type: String,
    label: 'Event Description',
    optional: true,
    max: 550
  },
  price: {
    type: Number,
    min: 5,
    max: 200,
    uniforms: {
      step: 0.50
    },
  },
  venue: {
    type: Object,
    optional: true,
    uniforms: (Meteor.isClient ? VenuesForm : null),
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
    optional: true,
    defaultValue: []
  },
  'categories.$': {
    type: String
  },
  appliedList: {
    type: Array,
    optional: true,
    defaultValue: []
  },
  "appliedList.$": {
    type: String
  },
  invitedList: {
    type: Array,
    optional: true,
    defaultValue: []
  },
  "invitedList.$": {
    type: String
  },
  confirmedList: {
    type: Array,
    optional: true,
    defaultValue: []
  },
  "confirmedList.$": {
    type: String
  },
  entertainers: {
    type: Array,
    optional: true,
    defaultValue: []
  },
  "entertainers.$": {
    type: String
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
  },
  partner: {
    type: Boolean, 
    optional: true,
    defaultValue: false,
    label: 'Pakke Partner',
    uniforms: {
      hidden: true
    }
  },
  partnerLink: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Url,
    label: 'Event Details & Sales',
    uniforms: {
      hidden: true
    }
  }
});
