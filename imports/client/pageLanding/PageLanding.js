import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ExplorePakke from './ExplorePakke';
import EventList from '../EventList';
import HowItWorks from './HowItWorks';


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

                <div className='what-is-pakke-event'>
                    <h3 className='what-is-pakke-event-text'>What is a Pakke event?</h3>
                    <p className='what-is-pakke-event-text'>A Pakke event is a highly currated gettogether. Each event is specially taylored for people to connect and discover all the unique and special people that might otherwise not be possible. We encourage you to socialize in uniques spaces. These spaces are meant to help people make connect and socialize in ways that simply aren’t possible at bars and other traditional spaces.</p>
                </div>

                <div className="landingValue">
                    <HowItWorks />
                </div>
            </div >
        )
    }
};

export default LandingPage;