import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import { withTracker } from 'meteor/react-meteor-data';


import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemText } from 'material-ui/List';

import MenuIcon from '@material-ui/icons/Menu';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import { CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

import AccountsUIWrapper2 from './AccountsUIWrapper2';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';


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

    linkToProfile() {
        this.props.history.push("/profile");
    }

    logOut() {
        Meteor.logout(Bert.alert("You Are Now Logged Out", "success"))
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
                        <ListItemText primary="PAKKE" />
                    </ListItem>
                    <Divider />
                    <ListItem button component={Link} to="/">
                        <ListItemText primary="Home" />
                    </ListItem>

                    <ListItem button component={Link} to="/about">
                        <ListItemText primary="About Pakke" />
                    </ListItem>
                    <ListItem button component={Link} to="/">
                        <ListItemText primary="How It Works" />
                    </ListItem>
                </List>
                <List>
                    <ListItem button component={Link} to="/events">
                        <ListItemText primary="Events" />
                    </ListItem>


                    <ListItem button component={Link} to="/login">
                        <ListItemText primary="Login" />
                    </ListItem>
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
                                <img src="/ImageLogoBlack.png" alt='none' style={styles.pakkeLogo} />
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
                                            <img data-toggle="dropdown" className="icon dropdown-toggle" src={Meteor.user().profile.avatar} />
                                        ) : (
                                                <img data-toggle="dropdown" className="icon dropdown-toggle" src='/missing_profile.png' />
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
                                        <MenuItem onClick={this.logOut}>Log Out</MenuItem>
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
            </div>


        );
    }
}


export default withTracker(() => {
    return {
        currentUser: Meteor.user(),
    };
})(Header3);