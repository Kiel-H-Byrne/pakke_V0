import React, { Component } from 'react';
import { Session } from 'meteor/session';
// import GoogleMap from './GoogleMap';
import GoogleMapContainer from './MapGoogle';

import Events from '../startup/collections/events';


class MyMap extends Component {
  constructor() {
    super();
    this.handleOnReady = this.handleOnReady.bind(this);
  }

  handleMapOptions() {
        let mapCenter;
        if (!Session.get('browserLoc')) {
            mapCenter = {'lat':38.902635, 'lng':-77.022938};
        } else {
            mapCenter = Session.get('browserLoc');
            // MAP_ZOOM = 12;
            console.log("Got mapCenter from Browser:", mapCenter);
        }
            return {
                // ============================= RETURN MAP OPTIONS ==================================    
                center: new google.maps.LatLng(mapCenter),
                zoom: 13,
                minZoom: 11,
                maxZoom: 17,
                // mapTypeId:google.maps.MapTypeId.TERRAIN,
                backgroundColor: "#555",
                clickableIcons: false,
                disableDefaultUI: true,
                fullscreenControl: false,
                zoomControl: true,
                zoomControlOptions: {
                    position: google.maps.ControlPosition.RIGHT_BOTTOM
                },
                mapTypeControl: false,
                mapTypeControlOptions: {
                    style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
                    position: google.maps.ControlPosition.RIGHT_CENTER,
                    // mapTypeIds: ['roadmap', 'terrain']
                },
                scaleControl: false,
                rotateControl: true,
                streetViewControl: false,
                streetViewControlOptions: {
                    position: google.maps.ControlPosition.BOTTOM_CENTER
                },
                //gestureHandling sets the mobile panning on a scrollable page: COOPERATIVE, GREEDY, AUTO, NONE
                gestureHandling: 'greedy',
                // Map styles; snippets from 'Snazzy Maps'.
                styles: 
                    // lightGray 
                    // [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#fefefe"}]},{"featureType":"administrative","elementType":"labels.text.stroke","stylers":[{"color":"#b2b2b2"}]},{"featureType":"administrative.country","elementType":"labels.text.stroke","stylers":[{"color":"#ff0000"}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"administrative.locality","elementType":"labels.text.stroke","stylers":[{"color":"#696969"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.stroke","stylers":[{"color":"#696969"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#aaaaaa"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#b3b3b3"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#9c9c9c"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#4f4f4f"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#6a6a6a"},{"visibility":"off"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#dbdbdb"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]}]
                    // greyMonochrome
                    [{"featureType":"all","elementType":"geometry.fill","stylers":[{"weight":"2.00"}]},{"featureType":"all","elementType":"geometry.stroke","stylers":[{"color":"#9c9c9c"}]},{"featureType":"all","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#eeeeee"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#7b7b7b"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#c8d7d4"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#070707"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]}]
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
          // url: 'img/markers/red_marker_sm.png'
          url: 'img/mkicons/home.png',
          size: {width: 25, height: 25},
          scaledSize: {width: 25, height: 25}
        };

        const markers = {};

        Events.find().observeChanges({
          added: function(id,doc) {
            // console.log(doc);

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
              position: latLngObj,
              map: map.instance,
              icon: eventImage,
              id: id,
            });


            markers[id] = marker;
            
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
      <GoogleMapContainer
        onReady={this.handleOnReady}
        mapOptions={this.handleMapOptions}
      >
        Loading!
      </GoogleMapContainer>
    );
  }
}

export default MyMap;
