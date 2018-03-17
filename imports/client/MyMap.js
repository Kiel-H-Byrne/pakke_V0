import React, { Component } from 'react';
import { Session } from 'meteor/session';
import GoogleMap from './GoogleMap';
import Events from '../startup/collections/events';


class MyMap extends Component {
  constructor() {
    super();
    this.handleOnReady = this.handleOnReady.bind(this);
  }

  handleMapOptions() {
    return {
      center: new google.maps.LatLng(38.889931, -77.009003),
      zoom: 12,
    };
  }

  handleOnReady(name) {

    if (!Session.get('browserLoc')) {
  $.getJSON("https://freegeoip.net/json/?", {
      format: "jsonp",
  }).done(function(data){
  /*
      // ================== RESPONSE ================== 
      // {"ip":"69.138.161.94","country_code":"US","country_name":"United States","region_code":"MD",
      //  "region_name":"Maryland","city":"Silver Spring","zip_code":"20902","time_zone":"America/New_York",
      //  "latitude":39.0409,"longitude":-77.0445,"metro_code":511}
  */

    let lat = data.latitude;
    let lng = data.longitude;
    let browserLocation = _.object( ['lat', 'lng'], [lat, lng]);
    // console.log("Coord from Browser: ", browserLocation);
    Session.set('browserLoc', browserLocation);
    Session.set('clientState', data.region_code);

  });
}


    GoogleMaps.ready(name, map => {
      Tracker.autorun(c => {

        // const completeFindAddress = new google.maps.places.Autocomplete(
        //   /** @type {!HTMLInputElement} */
        //   document.getElementById('findInput'),{
        //     types: ['address'],
        //     componentRestrictions: {country:'US'}
        // });

        const eventImage = {
          // url: 'img/red_marker_sm.png'
          url: 'img/mkicons/png/home.png',
          size: {width: 25, height: 25},
          scaledSize: {width: 25, height: 25}
        };

        const markers = {};

        Events.find().observeChanges({
          added: function(id,doc) {
            console.log(doc);

            let latLng = doc.eventAddress.coords.split(",");
            let lat = Number(latLng[0]);
            let lng = Number(latLng[1]);
            let latLngObj = _.object( ['lat', 'lng'], [lat, lng]);
            let rad = 1.3 * 1609.34;
            let marker_symbol = {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: '#9b30ff',
                fillOpacity: 0.5,
                strokeColor: '#330033',
                strokeOpacity: 0.5,
                strokeWeight: 1
            }

            const marker = new google.maps.Marker({
              animation: google.maps.Animation.DROP,
              position: new google.maps.LatLng(document.lat, document.lng),
              map: map.instance,
              icon: eventImage,
              id: document._id,
            });

            markers[document._id] = marker;
          },
          changed: function(newDocument, oldDocument) {
            markers[newDocument._id].setPosition({
              lat: newDocument.lat,
              lng: newDocument.lng,
            });
          },
          removed: function(oldDocument) {
            markers[oldDocument._id].setMap(null);
            google.maps.event.clearInstanceListeners(markers[oldDocument._id]);
            delete markers[oldDocument._id];
          },
        });

        this.computation = c;
      });
    });
  }

  componentWillUnmount() {
    this.computation.stop();
  }

  render() {
    return (
      <GoogleMap
        onReady={this.handleOnReady}
        mapOptions={this.handleMapOptions}
      >
        Loading!
      </GoogleMap>
    );
  }
}

export default MyMap;
