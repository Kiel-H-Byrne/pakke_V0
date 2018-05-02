import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ExplorePakke from './ExplorePakke';
import EventList from '../EventList';
import ValueProp from './ValueProp';


class LandingPage extends Component {
    render() {

        return (
            <div className='landingPage'>
                <div className='explore-pakke'>
                    <ExplorePakke />
                </div>


                <div className="landingEvents">
                    <h2>Pakke Inspired Events</h2>
                    <div className="scroll-wrapper-x">
                        <EventList />
                    </div>
                </div>

                <div className="landingValue">
                    <ValueProp />
                </div>
            </div >
        )
    }
};

export default LandingPage;