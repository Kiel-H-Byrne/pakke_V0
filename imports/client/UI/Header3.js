import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

    render() {
        const { classes } = this.props;
        
        const { auth, anchorEl } = this.state;
        
        const open = Boolean(anchorEl);

        const sideList = (
            <div className={classes.list}>
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
                <div className={classes.root}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="title" color="inherit" className={classes.flex}>Title</Typography>
                            {auth && (
                                <div>
                                    <IconButton
                                        aria-owns={open ? 'menu-appbar' : null}
                                        aria-haspopup="true"
                                        onClick={this.handleMenu}
                                        color="inherit"
                                    >
                                        <h1>Yo</h1>
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
                                        open={open}
                                        onClose={this.handleClose}
                                    >
                                        <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                                        <MenuItem onClick={this.handleClose}>My account</MenuItem>
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

Header3.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header3);