import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class ExplorePakke extends Component {
    render() {
        return (
            <div>
                <div id="landing-hero"></div>
                <div className='scroll-wrapper-x'>

                    <ul className='three-main-links'>

                        <div className='FindEvent'>
                            <Link to='/events'>
                                <img src='Events.jpg'></img>
                                <p>Find Events</p>
                                {/* <p><span className="branded_pakke">Pakke</span> brings you the different and the unique above the surface. Find local events here!</p> */}
                            </Link>
                        </div>

                        <div className='BecomeHost'>
                            <Link to='/host'>
                                <img src='Host.jpg'></img>
                                <p> Become a Host </p>
                                {/* <p>Show off your hosting skills and open space for unique events. Learn more about hosting here!</p> */}
                            </Link>
                        </div>

                        <div className='ShareTalent'>
                            <Link to='/talent'>
                                <img src='Talent.jpg'></img>
                                <p> Share Your Talent </p>
                                {/* <p><span className="branded_pakke">Pakke</span> encourages performers and artists to show the world what it means to be a creative. Join other creatives in your community!</p> */}

                            </Link>
                        </div>
                    </ul>
                </div>
            </div>


        )
    }
}


export default ExplorePakke;
