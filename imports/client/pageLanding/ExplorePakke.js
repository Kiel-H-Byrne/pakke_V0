import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class ExplorePakke extends Component {
    render() {
        return (
            <div className='scroll-wrapper-x'>

                <ul className='three-main-links'>

                    <div className='FindEvent'>
                        <Link to='/events'>
                            <img src='Events.jpg'></img>
                            <p>Find Events</p>
                        </Link>
                    </div>

                    <div className='BecomeHost'>
                        <Link to='/host'>
                            <img src='Host.jpg'></img>
                            <p> Become a Host </p>
                        </Link>
                    </div>

                    <div className='ShareTalent'>
                        <Link to='/talent'>
                            <img src='Talent.jpg'></img>
                            <p> Share Your Talent </p>
                        </Link>
                    </div>
                </ul>
            </div>

        )
    }
}


export default ExplorePakke;
