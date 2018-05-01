import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const myStyle = {
    textAlign: 'center',
}


class HowItWorks extends Component {
    
    render() {
    
        return (
            <div className='what-is-pakke'>
                <h2 style={myStyle}> How it works </h2>
                <div className='value-prop'>


                    <ul className='value-prop-items'>

                        <div className='idea'>
                            <Link className='value-prop-link'to='/events'>
                                <div className='idea-border'>
                                <img src="one.svg" alt="ticket" height="42" width="42"></img>
                                    <h3>1. Apply for Tickets</h3>
                                </div>
                                <p> It's free to apply. Just sign in.</p>
                                


                            </Link>
                        </div>

                        <div className='idea'>
                            <Link className='value-prop-link' to='/host'>
                                <div className='idea-border'>
                                <img src="two.svg" alt="ticket" height="42" width="42"></img>
                                    <h3>2. Get Selected </h3>
                                </div>
                                <p>Selections are made using a lottory system. If you are selected, you’ll receive an email to purchase your tickets.</p>

                            </Link>
                        </div>

                        <div className='idea'>
                            <Link className='value-prop-link' to='/talent'>
                                <div className='idea-border'>
                                <img src="three.svg" alt="ticket" height="42" width="42"></img>
                                    <h3>3. Buy Tickets </h3>
                                </div>
                                <p>Purchase your tickets for yourself and friends. Then we’ll email you the event location a day before the event.</p>
                            </Link>
                        </div>
                    </ul>
                </div>
            </div>
        )
    }
};


export default HowItWorks;

