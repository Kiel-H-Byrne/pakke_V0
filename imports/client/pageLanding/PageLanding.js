import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ExplorePakke from './ExplorePakke';
import EventList from '../EventList';
import FeaturedEventList from '../FeaturedEventList';


class LandingPage extends Component {
    render() {

        return (
            <div className='landingPage'>
                <div className='explore-pakke'>
                    <ExplorePakke />
                </div>


                <div className="landingEvents">
                    <h2>Featured Events</h2>
                    <h4 className="text-muted">Some of the hottest Pakke parties!</h4>
                    <div className="scroll-wrapper-x">
                        <FeaturedEventList />
                    </div>
                </div>
                <div className="landingEvents">
                    <h2>Pakke-Inspired Events</h2>
                    <h4 className="text-muted">Some ideas to spark your creativity!</h4>
                    <div className="scroll-wrapper-x">
                        <EventList />
                    </div>
                </div>


                <div className='what-is-pakke-event'>
                    <h3 className='what-is-pakke-event-text'>What is a Pakke event?</h3>
                    <p className='what-is-pakke-event-text '>A Pakke event is a highly curated gathering. Each event is specially tailored for people to connect and discover all of the unique and special people they may not otherwise get a chance to have a conversation with. We encourage you to socialize in uniques spaces. These spaces are meant to help people connect and socialize in ways that simply aren’t possible at bars and other traditional spaces.</p>
                </div>

                <div className="landingValue">
                    <HowItWorks />
                </div>
            </div >
        )
    }
};

export default LandingPage;