import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class ValueProp extends Component {
    render() {
        return (
            <div>
                <h2>Why Pakke? </h2>
                <div className='scroll-wrapper-x'>

                    <ul className='value-prop'>

                        <div className='idea1'>
                            <Link to='/events'>
                                {/* <img src='Events.jpg'></img> */}
                                <div className='idea-border'>
                                    <div className='glyphicon glyphicon-glass'></div>
                                    <h3>Guest</h3>
                                </div>
                                <p> Guests are the lifeblood of any event.
                                    Enjoy unique experiences around the city  </p>

                            </Link>
                        </div>

                        <div className='idea2'>
                            <Link to='/host'>
                                {/* <img src='Host.jpg'></img> */}
                                <div className='idea-border'>
                                    <div className='glyphicon glyphicon-home'></div>
                                    <h3> Host </h3>
                                </div>
                                <p> Host hold events in their space.
                                    They can make the experience theirs  </p>

                            </Link>
                        </div>

                        <div className='idea3'>
                            <Link to='/talent'>
                                {/* <img src='Talent.jpg'></img> */}
                                <div className='idea-border'>
                                    <div className='glyphicon glyphicon-music'></div>
                                    <h3> Talent </h3>
                                </div>
                                <p> Talent make the events come alive.
                                    Perform at events across the city.  </p>
                            </Link>
                        </div>
                    </ul>
                </div>
            </div>
        )
    }
};


export default ValueProp;

