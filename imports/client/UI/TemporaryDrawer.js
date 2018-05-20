import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemText } from 'material-ui/List';
// import InboxIcon from '@material-ui/icons/Inbox';
// import DraftsIcon from '@material-ui/icons/Drafts';

const styles = {
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
};

class TemporaryDrawer extends React.Component {
    state = {
        top: false,
        left: false,
        bottom: false,
        right: false,
    };

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

    render() {
        const { classes } = this.props;

        const sideList = (
            <div className={classes.list}>
                <List component="nav">
                    <ListItem button>
                        {/* <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon> */}
                        <ListItemText primary="Home" />
                    </ListItem>

                    <ListItem button>
                        {/* <ListItemIcon>
                            <DraftsIcon />
                        </ListItemIcon> */}
                        <ListItemText primary="About Pakke" />
                    </ListItem></List>
                <Divider />
                <List>
                    <ListItem button>
                        {/* <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon> */}
                        <ListItemText primary="Events" />
                    </ListItem>

                    <ListItem button>
                        {/* <ListItemIcon>
                            <DraftsIcon />
                        </ListItemIcon> */}
                        <ListItemText primary="How It Works" />
                    </ListItem>


                </List>
            </div>
        );


        return (
            <div>
                <Button onClick={this.toggleDrawer('left', true)}>Open Left</Button>

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

TemporaryDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TemporaryDrawer);