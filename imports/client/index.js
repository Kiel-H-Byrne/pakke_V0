import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';

import App from './App';
import '../../lib/fixtures';

targetListing = function(map,pos) {
    map.instance.setCenter(pos);
    map.instance.setZoom(12);
};

Meteor.startup(() => {

  //=====  GoogleMaps load =====  
  GoogleMaps.load({
    v: '3',
    key: Meteor.settings.public.keys.googleClient.key,
    libraries: ['places', 'geometry']
  });

render(
  (<BrowserRouter>
    <App />
  </BrowserRouter>),
  document.getElementById('render-target'));
 });


  Template.registerHelper('isOwner', function () {
    if (Meteor.user()) {
      const isOwner = Meteor.user()._id === this.creator;
      // console.log(test);
      return isOwner;
    }
  });


  Template.registerHelper('getDistance', function(dest) {
      //Get distance, convert to miles, flag as 'is_close' class if under X miles, (this class will be visible) 
      // console.log(this)

      if (GoogleMaps.loaded() && dest) {
        let latLng = dest.split(",");
        if (latLng) {
          let lat = Number(latLng[0]);
          let lng = Number(latLng[1]);
          let latLngObj = _.object( ['lat', 'lng'], [lat, lng]);
          
          let start = new google.maps.LatLng(Session.get('clientLoc') || Session.get('browserLoc'));
          let finish = new google.maps.LatLng(latLngObj);
          // let res = Meteor.call('calcDistance', loc, dest);
          
          let dist = google.maps.geometry.spherical.computeDistanceBetween(start,finish);
          // multiply meters by 0.000621371 for number of miles.
          let res = (dist * 0.000621371).toFixed(1);
          return res;
        }
      }
    });

  Template.registerHelper('isClose', function(distance) {
    if (distance <= 3) {
      return true;
    } else {
      return false;
    }
  });
