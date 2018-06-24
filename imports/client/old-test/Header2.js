import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import List, { ListItem, ListItemText } from '@material-ui/core/List';

import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { CardMedia } from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

import AccountsUIWrapper2 from './AccountsUIWrapper2';

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


class Header2 extends React.Component {

    state = {
        left: false,
    };


    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

    render() {
        const { classes } = this.props;
        // const { classes } = props;

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
                                <MenuIcon onClick={this.toggleDrawer('left', true)} />
                            </IconButton>
                            <Typography variant="title" color="inherit" className={classes.flex}>

                                <img src="/ImageLogoBlack.png" alt='none' className={classes.pakkeLogo} />
                            </Typography>
                            {/* <Button variant='raised' color="secondary">Login</Button> */}
                            <AccountsUIWrapper2 />
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

Header2.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header2);
