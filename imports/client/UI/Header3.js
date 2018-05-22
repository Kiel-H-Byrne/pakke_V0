import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import { withTracker } from 'meteor/react-meteor-data';

import { withStyles } from '@material-ui/core/styles';

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

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { CardMedia } from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

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
                height: '8rem',
            },
            flex: {
                flex: 1,

                // width: 50,
            },
            pakkeLogo: {
                height: 50,
                marginTop: 5,
                padding: 0
            },
            menuButton: {
                marginLeft: -12,
                marginRight: 20,
            },
            list: {
                width: 250,
                fontSize: 16
            },
            fullList: {
                width: 'auto',
            },
            avatar: {
                margin: '.5rem .5rem',
                height: '7rem',
                borderRadius: '50%',
            }
        };

        const User = Meteor.user()

        const { auth, anchorEl } = this.state;

        const open2 = Boolean(anchorEl);

        const sideList = (
            <div style={styles.list}>
                <List component="nav">
                    <ListItem
                        disableGutters={true}
                        divider={true}
                        style={{padding:"0 0 15px"}}
                    >
                        <img src="/ImageLogoBlack.png" className="" alt='Home' style={styles.pakkeLogo} />
                    </ListItem>
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
                    <ListItem button component={Link} to="/events">
                        <ListItemIcon>
                            <EventNoteIcon />
                        </ListItemIcon>
                        <ListItemText inset disableTypography primary="Events" />
                    </ListItem>
                    <Divider />
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
                <div className="header" style={styles.root}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton 
                                style={styles.menuButton} 
                                color="inherit" 
                                aria-label="Menu"
                                onClick={this.toggleDrawer('left', true)} 
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="title" color="inherit" style={styles.flex}>
                                <Link to='/'><img src="/ImageLogoBlack.png" className="icon logo" alt='Home' style={styles.pakkeLogo} /></Link>
                            </Typography>

                            {Meteor.user() ? (
                                <div>
                            {/*
                                    <IconButton
                                        aria-owns={open2 ? 'menu-appbar' : null}
                                        aria-haspopup="true"
                                        onClick={this.handleMenu}
                                        color="inherit"
                                    >
                                        {Meteor.user().profile.avatar ? (
                                            <img data-toggle="dropdown" className="icon dropdown-toggle" style={styles.avatar} src={Meteor.user().profile.avatar} />
                                        ) : (
                                                <img data-toggle="dropdown" className="icon dropdown-toggle" src='/missing_profile.png' />
                                            )}

                                    </IconButton>
                                    */}
                                    <ButtonBase
                                        focusRipple
                                        aria-owns={open2 ? 'menu-appbar' : null}
                                        aria-haspopup="true"
                                        onClick={this.handleMenu}
                                        style={{borderRadius: "50%"}}
                                    >
                                        {Meteor.user().profile.avatar ? (
                                            <img data-toggle="dropdown" className="icon dropdown-toggle" style={styles.avatar} src={Meteor.user().profile.avatar} />
                                        ) : (
                                                <img data-toggle="dropdown" className="icon dropdown-toggle" src='/missing_profile.png' />
                                        )}
                                    </ButtonBase>
                                    <Menu 
                                        id="menu-appbar"
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                                          vertical: 'bottom',
                                          horizontal: 'right',
                                        }}
                                        getContentAnchorEl = {null}
                                        transformOrigin={{
                                          vertical: 'top',
                                          horizontal: 'right',
                                        }}
                                        open={Boolean(anchorEl)}
                                        onClose={this.handleClose}

                                    >
                                        <MenuItem 
                                          
                                          component={Link} 
                                          to="/profile"
                                          onClick={this.handleClose}
                                          style={{fontSize:14}}
                                          primary="Profile"

                                        >Profile
                                        </MenuItem>
                                        <MenuItem  
                                          button
                                          onClick={this.logOut}
                                          style={{fontSize:14}}
                                          >Log Out
                                          </MenuItem>
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