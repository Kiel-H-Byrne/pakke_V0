import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';

import AccountsUIWrapper from './AccountsUIWrapper';
import AccountsUIWrapper2 from './AccountsUIWrapper2';
import FacebookButton from './FacebookButton';
import FacebookButton2 from './FacebookButton2';


class Header extends Component {
    logOut() {
        Meteor.logout(Bert.alert("You Are Now Logged Out", "success"))
        this.props.history.push('/')

    }

    render() {
        if (this.props.currentUser) {
            return (
                <div className='header' id="header-target">
                    <div className='header-links-left-signedin'>
                        <div className='dropdown'>
                            <Link to='/landing'><img className="icon logo" src='/img/brand/PAKKE_LOGO_black.png' /></Link>
                        </div>
                    </div>
                    {/* <h4> Discover | Connect | Experience </h4> */}
                    <div className="header-links-right-signedin">
                        <div className='dropdown'>
                            <span className="caret"></span>
                            
                            {Meteor.user().profile.avatar ? (
                                <img data-toggle="dropdown" className="icon avatar dropdown-toggle" src={Meteor.user().profile.avatar}/>
                                ): (
                                <img data-toggle="dropdown" className="icon avatar dropdown-toggle" src='/missing_profile.png' />
                                )}
                            
                            <ul className="dropdown-menu dropdown-menu-right">
                                <li><Link to='/profile'><h5>Profile</h5></Link></li>
                                <li><Link to='/events'><h5>Events</h5></Link></li>
                                <li><Link to='/' onClick={this.logOut}><h5>Logout</h5></Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className='header' id="header-target">
                    <div className='header-links-left-signedout'>
                        <div className='dropdown'>
                            <img data-toggle="dropdown" className="icon avatar dropdown-toggle" src='/img/brand/PAKKE_LOGO_black.png' />
                            <span className="caret"></span>
                            <ul className="dropdown-menu">
                                <li><Link to='/'><h5>Home</h5></Link></li>
                                <li><Link to='/about'><h5>About</h5></Link></li>
                                <li><Link to='/host'><h5>Become Host</h5></Link></li>
                            </ul>
                        </div>
                    </div>
                    {/* <h4> Discover | Connect | Experience </h4> */}
                    <div className="header-links-right-signedout">
                        <ul className='AccountsUI2'>
                            <li><AccountsUIWrapper2 /></li>
                        </ul>
                    </div>
                </div>
            )
        }
    }
}

export default withTracker(() => {
    return {
        currentUser: Meteor.user(),
    };
})(Header);
