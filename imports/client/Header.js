import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';

import AccountsUIWrapper from './AccountsUIWrapper';
import FacebookButton from './FacebookButton';
import FacebookButton2 from './FacebookButton2';


class Header extends Component {
    logOut() {
        Meteor.logout(Bert.alert("You Are Now Logged Out", "success"))
    }

    render() {
        if (this.props.currentUser) {
            return (
                <div className='header'>
                    <div className='header-links-left'>
                        <div className='dropdown'>
                            <img data-toggle="dropdown" className="icon dropdown-toggle" src='/logo.jpg' />
                            <span className="caret"></span>
                            <ul className="dropdown-menu">
                                <li><Link to='/'><h5>Home</h5></Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="header-links-right">
                        <div className='dropdown'> 
                            <span className="caret"></span> 
                            {Meteor.user().profile.avatar ? (
                                <img data-toggle="dropdown" className="icon dropdown-toggle" src={Meteor.user().profile.avatar} />
                                ) : (
                                <img data-toggle="dropdown" className="icon dropdown-toggle" src='missing_profile.png'/>
                                )
                            }
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
                    <div className='header-links-left'>
                        <div className='dropdown'>
                            <img data-toggle="dropdown" className="icon dropdown-toggle" src='/logo.jpg' />
                            <span className="caret"></span>
                            <ul className="dropdown-menu">
                                <li><Link to='/'><h5>Home</h5></Link></li>
                                <li><Link to='/about'><h5>About</h5></Link></li>
                                <li><Link to='/host'><h5>Become Host</h5></Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="header-links-right">
                        <ul>
                            <li><AccountsUIWrapper /></li>
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
