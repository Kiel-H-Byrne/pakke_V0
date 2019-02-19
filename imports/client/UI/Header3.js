import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Accounts } from 'meteor/std:accounts-ui';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";

import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { CardMedia } from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
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
import Avatar from '@material-ui/core/Avatar';

import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import HelpIcon from '@material-ui/icons/Help';
import EventIcon from '@material-ui/icons/Event';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import FlightLandIcon from '@material-ui/icons/FlightLand';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ChangeHistoryIcon from '@material-ui/icons/ChangeHistory';
import AccessibilityIcon from '@material-ui/icons/Accessibility';

// import AccountsUIWrapper2 from './AccountsUIWrapper2';


class HeaderComponent extends Component {

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
                console.log(error, this);
                // this.props.history.push('/')
            } else {
                Bert.alert("We don't even KNOW you anymore!", "pk-success", "fixed-bottom", "fa-thumbs-up");
                // this.props.history.push('/?logout')
                window.location.href="/?logout"
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
                flex: .5,

                // width: 50,
            },
            pakkeLogo: {
                height: 50,
                marginTop: 5,
                padding: 0
            },
            menuButton: {
                marginLeft: -12,
                // marginRight: 20,
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
            },
            button: {
                borderRadius: 5, 
                backgroundColor: '#2964ff', 
                color: 'white',
                fontSize: 12,
            }
        };

        const { auth, anchorEl } = this.state;

        const open2 = Boolean(anchorEl);

        const sideList = (
            <div style={styles.list}>
                <List component="nav">
                    <ListItem
                        disableGutters={true}
                        divider={true}
                        style={{padding:"0 0 3px"}}
                    >
                        <img src="/ImageLogoBlack.png" alt='Home' style={styles.pakkeLogo} />
                    </ListItem>
                    <ListItem button component={Link} to="/">
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText inset disableTypography primary="Home" />
                    </ListItem>

                    <ListItem button component={Link} to="/about">
                        <ListItemIcon>
                            <ChangeHistoryIcon />
                        </ListItemIcon>
                        <ListItemText inset disableTypography primary="About PAKKE" />
                    </ListItem>
                    <ListItem button component={Link} to="/howitworks">
                        <ListItemIcon>
                            <HelpIcon />
                        </ListItemIcon>
                        <ListItemText inset disableTypography primary="How It Works" />
                    </ListItem>
                    <ListItem button component={Link} to="/host">
                        <ListItemIcon>
                            <AccessibilityIcon />
                        </ListItemIcon>
                        <ListItemText inset disableTypography primary="Become a Host" />
                    </ListItem>
                    <ListItem button component={Link} to="/events">
                        <ListItemIcon>
                            <EventIcon />
                        </ListItemIcon>
                        <ListItemText inset disableTypography primary="Events" />
                    </ListItem>
                    <Divider />
                    {this.props.currentUser ? (
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
                            <Typography variant="h6" style={styles.flex}>
                                <Link to='/'><img src="/ImageLogoBlack.png" alt='PAKKE Home' style={styles.pakkeLogo} /></Link>
                            </Typography>
                            <Typography variant="caption" style={styles.flex}><i>An Events & Experiences Company</i></Typography>
                            {this.props.currentUser ? (
                                <div>
                            {/*
                                    <IconButton
                                        aria-owns={open2 ? 'menu-appbar' : null}
                                        aria-haspopup="true"
                                        onClick={this.handleMenu}
                                        color="inherit"
                                    >
                                        {this.props.currentUser.profile.avatar ? (
                                            <img data-toggle="dropdown" className="icon dropdown-toggle" style={styles.avatar} src={this.props.currentUser.profile.avatar} />
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
                                        {this.props.currentUser.profile.avatar ? (
                                            <Avatar data-toggle="dropdown"  style={styles.avatar} src={this.props.currentUser.profile.avatar} />
                                        ) : (
                                                <Avatar data-toggle="dropdown"  src='/missing_profile.png' />
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
                                        {/* <AccountsUIWrapper2 /> */}
                                    { /* <ButtonBase
                                    focusRipple
                                    aria-owns={open2 ? 'menu-appbar' : null}
                                    aria-haspopup="true"
                                    onClick={this.handleMenu}
                                    style={{borderRadius: "50%"}}
                                    >
                                        <img data-toggle="dropdown" className="icon dropdown-toggle" src='/missing_profile.png' />
                                    </ButtonBase> */ }
                                    <Button 
                                    focusRipple
                                    aria-owns={open2 ? 'menu-appbar' : null}
                                    aria-haspopup="true"
                                    onClick={this.handleMenu}
                                    style={styles.button}
                                    >
                                    Sign In 
                                    </Button>
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
                                            component={Accounts.ui.LoginForm}
                                             />
                                        </Menu>
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
            </div>
        );
    }
}


export default Header = withTracker(() => {
    return {
        currentUser: Meteor.user(),
    };
})(HeaderComponent)