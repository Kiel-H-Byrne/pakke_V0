import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import MyMap from './MyMap';
// import '../../client/scss/map';

import EventList from './EventList';

class LandingPage extends Component {
    render() {

        return (
            <div className='landingPage'>
                <h1>Explore Pakke </h1>
                <div className='scroll-wrapper-x'>

                    <ul className='three-main-links'>
                        <div><Link to='/events'>Find an Event </Link> </div>
                        <div><Link to='/host'>Become a Host </Link></div>
                        <div><Link to='/talent'>Share Your Talent </Link></div>
                    </ul>
                </div>

                <div className="landingEvents">
                    <h2>Featured Events</h2>
                    <div className="scroll-wrapper-x">
                        <EventList />
                    </div>
                </div>
                <div className="landingValue">
                    <h2>Why PAKKE?</h2>
                    <p>value value value</p>
                </div>
            </div>
        )
    }
};

export default LandingPage;


{/* <div className="landingMap">
    <MyMap />
    <div className="mapOverlay"></div>
    <h2>Explore your Area</h2>
</div> */}