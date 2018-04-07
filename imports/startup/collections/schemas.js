import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import uniforms from 'uniforms';

Schema = {};

//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
//======================  DON'T TOUCH ME!!!!!!!!! ==========================
//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

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
        type: Object,
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
    }
});
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//======================  DON'T TOUCH ME!!!!!!!!! ==========================
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Schema.Address = new SimpleSchema({
  zip: {
    type: String,
    regEx: SimpleSchema.RegEx.ZipCode,
    optional: true
  },
  address: {
    type: String,
    optional: true,
    // custom: function() {
    //   //if street has no value and isSet(), and this has no value, throw error 
    //   const hasStreet = this.field('street').isSet ;
    //   if (!hasStreet) {
    //     // inserts
    //     if (!this.operator) {
    //       if (!this.isSet || this.value === null || this.value === "") return "required";
    //     }

    //     // updates
    //     else if (this.isSet) {
    //       if (this.operator === "$set" && this.value === null || this.value === "") return "required";
    //       if (this.operator === "$unset") return "required";
    //       if (this.operator === "$rename") return "required";
    //     }
    //   } else {
    //     let addressString =  `${this.field('street').value} ${this.field('city').value}, ${this.field('state').value} ${this.field('zip').value}`;
        
    //     // let el = $('input[name="address")')[0];
    //     this.value = addressString;
    //     return {$set: addressString};
    //   }
    //   return;
    // },
    // autoValue: function() {
    //   if ( (this.isInsert || this.isUpdate) && this.field('street').isSet) {
    //     let addressString =  `${this.field('street').value} ${this.field('city').value}, ${this.field('state').value} ${this.field('zip').value}`;
    //     return addressString;
    //   }
    // }
  },
  street: {
    type: String,
    max: 100,
    optional: true
  },
  place: {
    type: String,
    max: 30,
    label: 'Apt., Floor, Suite',
    optional: true
  },
  corner: {
    type: String,
    label: 'Cross Streets',
    optional: true
  },
  city: {
    type: String,
    max: 50,
    optional: true,
    defaultValue: 'Washington'
  },
  state: {
    type: String,
    allowedValues: ["AL","AK","AZ","AR","CA","CO","CT","DC","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"],
    optional: true
  },
  country: {
    type: String,
    min: 2,
    max: 3,
    optional: true,
    defaultValue: 'US'
  },
  coords: {
    type: String,
    optional: true,
    autoValue: function () {
      let eventAddress = this.field("eventAddress").value;
      let hostAddress = this.field("hostAddress").value;
      let guestAddress = this.field("guestAddress").value;
      // console.log(this.siblingField("street"));
      let address = hostAddress || eventAddress || guestAddress ;
      // console.log(address);
      if (address) {
        let street = address.street || address.corner;
        let zip = address.zip;
      // console.log(street);
        if ( zip && this.isInsert && !this.isSet) {
        // console.log(zip);
          const params = {};
          // console.log(this.docId);
          if (street) params.street = street;
          params.city = address.city;
          params.state = address.state;
          params.zip = zip;
          let response = Meteor.call('geoCode', params);

          if (response && response.results.length) {
            let loc = response.results[0].geometry.location;
            // console.log("GOOGLE TYPES:") ;
            // console.log(response.results[0].types);
            // this.field("google_id").value = place_id;
            //====== RETURN LAT/LONG OBJECT LITERAL ======
            // return loc;
            //====== RETURN STRINGIFIED LAT/LONG NUMBERS ======
            let arr =  _.values(loc);
            // console.log(arr.toLocaleString());
            return arr.toLocaleString();
          } else {

            // console.log(response);
            console.log("NO COORDINATES");
            //no street name, so must be online Only. 
            //set category to "Online"
            // console.log(typeof street);
            // console.log(this.docId);
            this.unset();
          } //if response else
        } //if zip
      } //if address
    }
  },  
});

Schema.Survey = new SimpleSchema({
  partyMusic: {
    type: String,
    label: 'Party Music',
    optional: true
  },
  favSong: {
    type: String,
    label: 'Shower Song',
    optional: true
  },
  favColor: {
    type: String,
    label: 'Favorite Color',
    optional: true
    },
  favBYOB: {
      type: String,
      label: 'What do you BYOB?',
      optional: true
    },
  famousPerson: {
      type: String,
      label: 'Meet Which Famous Person?',
      optional: true
    },
  innerDisney: {
      type: String,
      label: 'Inner Disney Princess',
      optional: true
    },
  vetStatus: {
      type: String,
      label: 'Veteran?',
      optional: true
    },
  armedService: {
      type: String,
      label: 'In The Service?',
      optional: true
    },
  furthestDest: {
      type: String,
      label: 'Furthest Destination Traveled',
      optional: true
    },
  commuterType: {
      type: String,
      label: 'What do you do while commuting?',
      optional: true
  }
});

Schema.Profile = new SimpleSchema({
  firstName: {
      type: String,
      label: 'First Name',
      optional: true
  },
  lastName: {
      type: String,
      label: 'Last Name',
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
    type: Schema.Survey,
    optional: true,
  }
});


//NOT A REAL SCHEMA, WE NEED TO EXTEND THE USERS DOCUMENTS WITH EACH OF THESE FIELDS. 
//WHERE DO WE DO THIS, UPON FIRST EVENT HOSTED/ATTENDED, ETC?
//OR UPON USER CREATION WITH EMPTY FIELDS AND POPULATE LATER.
Schema.User = new SimpleSchema( {
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
  }
})



Schema.asGuest = new SimpleSchema({
  //the editable profile
  distinguisher: {  
    type: String,
    label: 'Unique Identifier',
    optional: true
  }
});


Schema.Venue = new SimpleSchema({
  nickname: {
    type: String,
    label: 'A Nickname'
  },
  address: {
    type: Schema.Address
  },
  venueType: { 
    type: String,
    label: 'What Type of Venue is this (Commercial / Apartment / Condo / House? )',
    optional: true
  },
  ownedStatus: {
    type: Boolean,
    label: 'I own this venue?',
    optional: true
  }

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


Schema.asTalent = new SimpleSchema({
  talentType: {
    type: String,
    label: 'How do you entertain?',
    optional: true
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

  }
});



Schema.Event = new SimpleSchema({

  // We use `label` to put a custom label for this form field
  // Otherwise it would default to `Title`
  // 'optional: false' means that this field is required
  // If it's blank, the form won't submit and you'll get a red error message
  // 'type' is where you can set the expected data type for the 'title' key's value
  "host": {
    type: Object,
    label: "Host",
    optional: true
  },
  "host.id": {
    type: String,
    optional: true,
    label: "Host ID",
    autoValue: function() {
      if (Meteor.userId() && this.isInsert && !this.isSet) {
        return Meteor.userId();
      }
    }
  },    
  "host.username": {
    type: String,
    optional: true,
    autoValue: function() {
      // if (this.field("name").value) {
      // let name = this.field("name").value;
      let userID = Meteor.userId();
      let profile = Meteor.user().profile;
      console.log(profile.name);
      return userID;
    }
  },
  "host.email": {
    type: String,
    optional: true,
    autoValue: function() {
      //get email of logged in user
      // if (Meteor.userId() && this.isInsert && !this.isSet) {
      //   return Meteor.user().emails[0].address;
      // }
    }
  },
  date: {
    type: Date,
    min: function() {
      return new Date();
    }
  },
  size: {
    type: String,
    max: 2,
  },
  byline: {
    type: String,
    label: 'Tag Line'
  },
  description: {
    type: String,
    optional: true
  },
  eventAddress: {
    type: Schema.Address,
    label: 'Event Address',
    optional: true
  },
  atHost: {
    type: Boolean,
    label: 'At My House',
    optional: true
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
    // custom: function () {
      // I WANT TO PUSH THE CATEGORY "ONLINE ONLY" TO THIS ARRAY
      //$set function on this key??
    // },
  },
  'categories.$': {
    type: String
  },
  attended: {
    type: Boolean,
    label: 'Attended?',
    optional: true,
    // autoValue: function() {
    //   // if isn't set, 
    //   //if meteor.user.id is in the array of events.guests, set value to true
        // if user.id = creator of event (host) set to true.
    // }
  },
  guests: {
    type: Array,
    optional: true
  },
  'guests.$': {
    //stores array of guest_ids; which can be used for search later.
    type: String
  },
  guestCount: {
    type: Number,
    optional: true,
    minCount: 0,
    autoValue: function() {
      if (this.siblingField("guests").value) {
        let arr = this.siblingField("guests").value;
        console.log (arr.length);
        return arr.length;
      } else {
        return 0
      }
    }
  },
  retired: {
    type: Boolean,
    optional: true,
    autoValue: function() {
      //RETURN FALSE IF DATE.NOW() > DATE SIBLING FIELD.
      
      let age = Date.now() - Date.parse(this.siblingField("date").value);
      if (age > 10) {
        return true;
      } else {
        return false
      }
    }
  },
  creator: {
    type: String,
    autoValue: function() {
      return Meteor.userId();
    }
  },
  submitted: {
    type: Date,
    autoValue: function() {
      return new Date();
    }
  }
});
