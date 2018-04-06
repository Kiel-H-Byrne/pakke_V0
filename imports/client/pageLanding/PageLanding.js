import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ExplorePakke from './ExplorePakke';
import EventList from '../EventList';
import ValueProp from './ValueProp';
import FormBecomeHost from '../FormBecomeHost';


class LandingPage extends Component {
    render() {

        return (
            <div className='landingPage'>
                <h1>Explore Pakke </h1>
                <ExplorePakke />
                

                <div className="landingEvents">
                    <h2>Featured Events</h2>
                    <div className="scroll-wrapper-x">
                        <EventList />
                    </div>
                </div>
                
                <div className="landingValue">
                    <ValueProp />
                </div>
            </div>
        )
    }
};

export default LandingPage;