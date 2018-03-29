import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import MyMap from './MyMap';
import '../../client/scss/map';

import EventList from './EventList';

class LandingPage extends Component {
    render() {

        return (
            <div className='landingPage'>
                <div className="exploreBox">
                    <h1>Explore Pakke </h1>
                    <ul>
                        <li><Link to='/search'>Join A PAKKE </Link> </li>
                        <li><Link to='/host'>Host A PAKKE </Link></li>
                        <li><Link to='/talent'>Entertain the PAKKE </Link></li>
                    </ul>
                </div>
                <div className="landingMap">
                    <MyMap />
                    <div className="mapOverlay"></div>
                    <h2>Explore your Area</h2>
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