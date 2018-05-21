import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import { withTracker } from 'meteor/react-meteor-data';

import { withStyles } from 'material-ui/styles';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Drawer from '@material-ui/core/Drawer';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import HelpIcon from '@material-ui/icons/Help';
import EventNoteIcon from '@material-ui/icons/EventNote';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import FlightLandIcon from '@material-ui/icons/FlightLand';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import { CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

import AccountsUIWrapper2 from './AccountsUIWrapper2';


class Header3 extends React.Component {

    state = {
        left: false,
        auth: true,
        anchorEl: null,
    };

    handleChange = (event, checked) => {
        this.setState({ auth: checked });
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    logOut() {
        Meteor.logout(function (error) {
            if (error) {
                this.props.history.push('/')
            } else {
                Bert.alert("You Are Now Logged Out", "success")
            }
        })
    }

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

    render() {

        const styles = {
            root: {
                flexGrow: 1,
            },
            flex: {
                flex: 1,

                // width: 50,
            },
            pakkeLogo: {
                height: 50,
                marginTop: 5,
            },
            menuButton: {
                marginLeft: -12,
                marginRight: 20,
            },
            list: {
                width: 250,
                fontSize: '16px'
            },
            fullList: {
                width: 'auto',
            },
        };

        const User = Meteor.user()

        const { auth, anchorEl } = this.state;

        const open2 = Boolean(anchorEl);

        const sideList = (
            <div style={styles.list}>
                <List component="nav">
                    <ListItem>
                        <img src="/ImageLogoBlack.png" className="icon logo" alt='Home' style={styles.pakkeLogo} />
                    </ListItem>
                    <Divider />
                    <ListItem button component={Link} to="/">
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText inset disableTypography primary="Home" />
                    </ListItem>

                    <ListItem button component={Link} to="/about">
                        <ListItemIcon>
                            <FingerprintIcon />
                        </ListItemIcon>
                        <ListItemText inset disableTypography primary="About Pakke" />
                    </ListItem>
                    <ListItem button component={Link} to="/howitworks">
                        <ListItemIcon>
                            <HelpIcon />
                        </ListItemIcon>
                        <ListItemText inset disableTypography primary="How It Works" />
                    </ListItem>
                </List>
                <List>
                    <ListItem button component={Link} to="/events">
                        <ListItemIcon>
                            <EventNoteIcon />
                        </ListItemIcon>
                        <ListItemText inset disableTypography primary="Events" />
                    </ListItem>
                    {User ? (
                        <ListItem button onClick={this.logOut}>
                            <ListItemIcon>
                                <FlightTakeoffIcon />
                            </ListItemIcon>
                            <ListItemText inset disableTypography primary="Log Out" />
                        </ListItem>
                        ) : null
                    }
                </List>
            </div>
        );

        return (
            <div>
                <div style={styles.root}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton style={styles.menuButton} color="inherit" aria-label="Menu">
                                <MenuIcon onClick={this.toggleDrawer('left', true)} />
                            </IconButton>
                            <Typography variant="title" color="inherit" style={styles.flex}>
                                <Link to='/'><img src="/ImageLogoBlack.png" className="icon logo" alt='Home' style={styles.pakkeLogo} /></Link>
                            </Typography>

                            {Meteor.user() ? (
                                <div>
                                    <IconButton
                                        aria-owns={open2 ? 'menu-appbar' : null}
                                        aria-haspopup="true"
                                        onClick={this.handleMenu}
                                        color="inherit"
                                    >
                                        {Meteor.user().profile.avatar ? (
                                            <img data-toggle="dropdown" className="icon avatar dropdown-toggle" src={Meteor.user().profile.avatar} />
                                        ) : (
                                                <img data-toggle="dropdown" className="icon avatar dropdown-toggle" src='/missing_profile.png' />
                                            )}

                                    </IconButton>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={open2}
                                        onClose={this.handleClose}
                                    >
                                        <Link to='/profile'>
                                            <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                                        </Link>
                                        <Link to='/'>
                                            <MenuItem onClick={this.logOut}>Log Out</MenuItem>
                                        </Link>
                                    </Menu>
                                </div>
                            )
                                : (
                                    <div>
                                        <AccountsUIWrapper2 />
                                    </div>

                                )}


                        </Toolbar>
                    </AppBar>
                </div>

                <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer('left', false)}
                        onKeyDown={this.toggleDrawer('left', false)}
                    >
                        {sideList}
                    </div>
                </Drawer>
            </div >


        );
    }
}


export default withTracker(() => {
    return {
        currentUser: Meteor.user(),
    };
})(Header3)