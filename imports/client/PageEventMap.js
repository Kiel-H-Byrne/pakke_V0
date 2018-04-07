import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import EventList from './EventList';
import Map from './Map';


class LandingPage extends Component {
    render() {

        return (
            <div>
                <div className="landingMap">
                    <Map />
                    {/* < div className="mapOverlay"></div>
                    <h2>Explore your Area</h2> */}
                </div>


                <div className="landingEvents">
                    <h2>Events</h2>
                    <div className="scroll-wrapper-x">
                        <EventList />
                    </div>
                </div>
            </div>
        )
    }
};

export default LandingPage;