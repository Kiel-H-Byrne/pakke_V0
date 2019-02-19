import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';

import VpnKey from '@material-ui/icons/VpnKey';
import Launch from '@material-ui/icons/Launch';
import EventAvailable from '@material-ui/icons/EventAvailable';
import PersonAdd from '@material-ui/icons/PersonAdd';
import ConfirmationNumber from '@material-ui/icons/ConfirmationNumber';
import LocalActivity from '@material-ui/icons/LocalActivity';
import AllInclusive from '@material-ui/icons/AllInclusive';
import Mood from '@material-ui/icons/Mood';
import People from '@material-ui/icons/People';
// import  from '@material-ui/icons/';


function HowItWorks(props) {

    const { theme } = props;
    //   const primaryText = theme.palette.text.primary;
    //   const primaryColor = theme.palette.primary.main;

    const styles = {
        wrapper: {
            flexGrow: 1,
            marginTop: theme.spacing.unit * 10,
            // background: theme.palette.secondary.main,
            // background: 'url(https://www.designbolts.com/wp-content/uploads/2013/02/Sandbag-Grey-Seamless-Pattern-For-Website-Background.jpg)',

            height: '100%',
        },
        paper: {
            // background: theme.palette.primary.light,
            // width: '100%',
        },
        box1: {
            padding: `${theme.spacing.unit *1.5}px ${theme.spacing.unit * 2}px`,
        },
        box2: {
            padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
            marginBottom: '5%',
        },
        icon: {
            display: 'block',
            margin: 'auto',
            color: theme.palette.text.primary,
            fontSize: 50
        },
        divider: {
            // color: theme.palette.secondary.dark
            // border: 'blue',
            // background: 'blue',
            borderColor: theme.palette.secondary.light,
            width: '15%',
            // borderStyle: 'blue',
        }
    };

    return (
    <Grid id="HowItWorks" container justify={'center'} style={styles.wrapper}>
        <Paper style={styles.paper}>
            <Typography variant='h4' align={'center'} style={styles.box1}>Forget FOMO. Find your PAKKE. 
</Typography>

            <Grid container justify={'center'} style={{ marginTop: '1%' }} direction='row'>

                <Grid item xs={12} md={4}>
                    <Launch style={styles.icon} />
                    <Typography align={'center'} style={styles.box1} variant="h5">
                    1. Find Your Community</Typography>
                    <hr style={styles.divider} />
                    <Typography align={'center'} style={styles.box2} variant="subtitle1">Search for a local experience and do something new (instead of going to that same old bar....again).</Typography>
                </Grid>

                <Grid item xs={12}  md={4}>
                    <EventAvailable style={styles.icon} />
                    <Typography align={'center'} style={styles.box1} variant="h5">2. Buy Ticket </Typography>
                    <hr style={styles.divider} />
                    <Typography align={'center'} style={styles.box2} variant='subheading'>Purchase your ticket to gain access to event details, features, and important party details.</Typography>
                </Grid>

                <Grid item xs={12} md={4}>
                    <ConfirmationNumber style={styles.icon} />
                    <Typography align={'center'} style={styles.box1} variant="h5">3. Connect with Community</Typography>
                    <hr style={styles.divider} />
                    <Typography align={'center'} style={styles.box2} variant='subheading'>Bring something to share, meet a new friend, meet awesome people in your community!</Typography>
                </Grid>
            </Grid>
        </Paper>
    </Grid>
    );
}

HowItWorks.propTypes = {
    theme: PropTypes.object.isRequired,
};

export default withTheme()(HowItWorks); // Let's get the theme as a property