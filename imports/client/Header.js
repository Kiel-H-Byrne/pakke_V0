import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';

class Header extends Component {
    logOut() {
        Meteor.logout(Bert.alert("You Are Now Logged Out", "success"))
    }

    render() {
        if (this.props.currentUser) {
            return (
                <div className='header'>
                    <div className='header-links-left'>
                        <ul>
                            <li><Link to='/'><img className="icon" src='/logo.jpg' /></Link></li>
                            <li><p>Washington, D.C.</p></li>
                        </ul>
                    </div>
                    <div className="header-links-right">
                        <ul>
                            <li><Link to='/profile'><h5>Profile</h5></Link></li>
                            <li><Link to='/' onClick={this.logOut}><h5>Logout</h5></Link></li>
                        </ul>
                    </div>
                </div>
            )
        } else {
            return (
                <div className='header' id="header-target">
                    <div className='header-links-left'>
                        <ul>
                            <li><Link to='/'><img className="icon" src='/logo.jpg' /></Link></li>
                            <li><p>Washington, D.C.</p></li>
                        </ul>
                    </div>
                    <div className="header-links-right">
                        <ul>
                            <li><Link to='/about'><h5>About</h5></Link></li>
                            <li><Link to='/host'><h5>Become Host</h5></Link></li>
                            <li><Link to='/login'><h5>Login</h5></Link></li>
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