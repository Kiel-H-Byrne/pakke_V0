import React from 'react';
import AccountsUIWrapper from './AccountsUIWrapper.js';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className='landingPage'>
            <div className='text'>
                <div className='text-box'>
                    <h1>Pakke</h1>
                    <h3>Always Different. Never the Same.</h3>
                    <button type="button" className="btn btn-lg btn-default">
                        <Link to="/login" className="find-events"id="login-link">Find Events Near You!</Link>
                    </button>
                </div>
            </div>
            <img src="dc.jpg" className='background-img' alt="night out on town" />
    
            <h2>Featured Events</h2>
            <div className='featured-events'>
                <img src='bill.jpg'/>
                    <img src='rachel.jpg'/>
                        <img src='obama.jpg'/>
                            <img src='steve.jpg'/>

            </div>
        </div>
)};

export default LandingPage;