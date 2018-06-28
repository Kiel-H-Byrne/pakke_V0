import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ExplorePAKKE from './ExplorePAKKE';
import EventList from '../EventList';
import FeaturedEventList from '../FeaturedEventList';


class LandingPage extends Component {
    render() {

        return (
            <div className='landingPage'>
                <div className='explore-pakke'>
                    <ExplorePAKKE />
                </div>

                <div className="landingEvents">
                    <h2>Events</h2>
                    <h4 className="">Some of the hottest PAKKE parties!</h4>
                    <div className="scroll-wrapper-x">
                        <EventList />
                    </div>
                </div>

                <div className='what-is-pakke-event'>
                    <h3 className='what-is-pakke-event-text'>What is a PAKKE event?</h3>
                    <p className='what-is-pakke-event-text '>A PAKKE event is a highly curated gathering. Each event is specially tailored for people to connect and discover all of the unique and special people they may not otherwise get a chance to have a conversation with. We encourage you to socialize in uniques spaces. These spaces are meant to help people connect and socialize in ways that simply aren’t possible at bars and other traditional spaces.</p>
                </div>

                <div className="landingValue">
                    <HowItWorks />
                </div>
            </div >
        )
    }
};

export default LandingPage;