import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
// import { withTracker } from 'meteor/react-meteor-data';
// import { BarLoader } from 'react-spinners';

class NomadicoDetails extends Component {
  constructor(props) {
    
    super(props)
    this.state = {
      eventHost: {},
      soldOut: false
    }
  }

  render() {
    return (
      <div>
        <CardMedia src='img/events/nomadico__cover.png' />
        <h2>Meso Creso's Nomadico Festival</h2>
        June 8-11
       <address>   980 Cove Rd, Gore, VA 22637 </address>
        <p>A festival celebrating global music, arts, and community featuring 40 DJs, workshops, yoga and wellness. Boho camping nestled in Virginia's Appalachian Mountains with immersive experiences and interactive artworks.</p>
        <button></button>
      </div>
    )
  }
};

export default NomadicoDetails ;


