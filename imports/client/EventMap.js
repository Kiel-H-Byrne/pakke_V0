import React, { Component } from 'react';
import { Session } from 'meteor/session';
import { _ } from 'underscore';
import { withTracker } from 'meteor/react-meteor-data';

import { BarLoader } from 'react-spinners';

// import GoogleMap from './GoogleMap';
import GoogleMapContainer from './MapGoogle';
import Venues from '/imports/startup/collections/venues';

const styles = {
  map: {
    height: '140px'
  }
}

class EventMap extends Component {
  constructor(props) {
    super(props);
    this.handleOnReady = this.handleOnReady.bind(this);
  }

  handleMapOptions = () => {
      if (this.props.venue) {
        return {
              // ============================= RETURN MAP OPTIONS ==================================    
              center: this.props.venue.location,
              zoom: 17,
              minZoom: 15,
              maxZoom: 17,
              // mapTypeId:google.maps.MapTypeId.TERRAIN,
              backgroundColor: "#222",
              clickableIcons: false,
              disableDefaultUI: true,
              fullscreenControl: false,
              zoomControl: false,
              zoomControlOptions: {
                  position: google.maps.ControlPosition.RIGHT_BOTTOM
              },
              mapTypeControl: false,
              scaleControl: false,
              streetViewControl: false,
              //gestureHandling sets the mobile panning on a scrollable page: COOPERATIVE, GREEDY, AUTO, NONE
              gestureHandling: 'greedy',
              // Map styles; snippets from 'Snazzy Maps'.
              styles: 
              [{"featureType":"all","elementType":"geometry.fill","stylers":[{"weight":"2.00"}]},{"featureType":"all","elementType":"geometry.stroke","stylers":[{"color":"#9c9c9c"}]},{"featureType":"all","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#eeeeee"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#7b7b7b"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#c8d7d4"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#070707"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]}]
        };
      }
  } 
  
  handleOnReady(name) {
    GoogleMaps.ready(name, map => {
      
      const eventImage = {
        // url: 'img/markers/red_marker_sm.png'
        // url: 'https://www.pakke.us/img/markers/PAKKE_marker_blk.png',
        url: '/img/markers/PAKKE_marker_blk.png',
        size: {width: 15, height: 15},
        scaledSize: {width: 15, height: 15}
      };

      const venue = this.props.venue;
      const infoContent =  `
        <strong>${venue.nickname}</strong><br />
        <small>${venue.address}</small>
      `;
      let marker = new google.maps.Marker({
        animation: google.maps.Animation.DROP,
        position: venue.location,
        map: map.instance,
        title: venue.address,
        // label: venue.address
        icon: eventImage
      }); 
      marker.info = new google.maps.InfoWindow({
          content: infoContent,
          maxWidth: 100,
          position: venue.location
        })
      marker.info.open(map.instance) 
      marker.addListener('clicked', function() {
        marker.info.open(map.instance)  
      });

    });
  }

  render() {
    return (
      !this.props.ready ? (
              <BarLoader 
        loading={!this.props.ready} 
        color='#2964ff'
        width={-1}
        height={10}
      />
      ) : (
      <GoogleMapContainer
        onReady={this.handleOnReady}
        mapOptions={this.handleMapOptions}
        style={styles.map}
      >
      <BarLoader 
        loading={!this.props.ready} 
        color='#2964ff'
        width={-1}
        height={10}
      />
      </GoogleMapContainer>
      )
    );
  }
}

export default withTracker(({venueId}) => {
  let eventsSub = Meteor.subscribe('venue', venueId) 

    return {
      ready: eventsSub.ready(),
      venue: Venues.find({_id: venueId}).fetch()[0]
    }
})(EventMap)
