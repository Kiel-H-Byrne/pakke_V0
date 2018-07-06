import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class AboutPAKKE extends Component {
    render() {
        return (
            <div className='what-is-pakke-wrapper'>
                <h2>What is PAKKE? </h2>
                <div className='what-is-pakke-text'>
                    <p>We want to help you be a part of your community. Our vision is to enhance and enrich the experience of socializing--the Where, and the Who. We want to unlock underutilized and unique spaces for locals to meet and socialize. The physical environment is just as important to a day or night out that (if done right) we may open our doors as hosts for curated events that keep us all yearning for more PAKKE'd Events.
                <br />
                        <br />PAKKE's network of hosts, guests, and local artists, will drive another revenue stream that would have otherwise went to traditional establishments like bars and restaurants. </p>

                </div>
                <div className='value-prop'>
                    <ul className='value-prop-items'>

                        <div className='idea'>
                            <Link to='/events'>
                                {/* <img src='Events.jpg'></img> */}
                                <div className='idea-border'>
                                    <div className='glyphicon glyphicon-glass'></div>
                                    <h3>Guest</h3>
                                </div>
                                <p> PAKKE’s vision is to focus on the overall experience of how we socialize and more importantly, where and with who. As a guest, this is your opportunity to meet new people, learn about your city, and save money.</p>


                            </Link>
                        </div>

                        <div className='idea'>
                            <Link to='/host'>
                                {/* <img src='Host.jpg'></img> */}
                                <div className='idea-border'>
                                    <div className='glyphicon glyphicon-home'></div>
                                    <h3> Host </h3>
                                </div>
                                <p>
                                    The physical environment is just as important to a day or night out that, if done right, we are willing to open our doors as hosts for curated events. For all hosts, there will be a dedicated experience curator that will provide professional support so your event is successful and profitable.
                                    </p>

                            </Link>
                        </div>

                        <div className='idea'>
                            <Link to='/talent'>
                                {/* <img src='Talent.jpg'></img> */}
                                <div className='idea-border'>
                                    <div className='glyphicon glyphicon-music'></div>
                                    <h3> Local Artist </h3>
                                </div>
                                <p> PAKKE believes in the power of experiences but finding ways to tap into a unique social outting, we need creative people to guide us there. This is why we pay very close attention to our talented professionals who choose PAKKE as a way to bring their art, craft or trade to our communities. Join us today and see how your talent can earn recognition and money.</p>
                            </Link>
                        </div>
                    </ul>
                </div>
            </div>
        )
    }
};


export default AboutPAKKE;
