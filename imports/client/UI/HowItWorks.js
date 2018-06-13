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
        box0: {
            width: 375,

        },
        box1: {
            padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
        },
        box2: {
            padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
            marginBottom: '5%',
        },
        icon: {
            height: 75,
            width: 200,
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

    //style == className in these withTheme components

    return (

        <div id="HowItWorks">
            <Grid container justify={'center'} style={styles.wrapper}>
                <Paper style={styles.paper}>
                    <Grid container justify={'center'} style={{ marginTop: '1%' }} >
                        <Grid item>
                            <Typography variant='display2' component="h1" align={'center'} style={styles.box1}>How It Works</Typography>
                        </Grid>
                    </Grid>



                    <Grid container justify={'center'} style={{ marginTop: '1%' }}>

                        <Grid item style={styles.box0}>
                            <Grid container justify={'center'}>
                                <Launch style={styles.icon} />
                            </Grid>
                            <Typography align={'center'} style={styles.box1} variant="display1" component="h1">1. Apply for Ticket</Typography>
                            <hr style={styles.divider} />
                            <Typography align={'center'} style={styles.box2} variant="headline">Its free to apply, just sign in! Apply up until the day before the event.</Typography>
                        </Grid>

                        <Grid item style={styles.box0}>
                            <Grid container justify={'center'}>
                                <EventAvailable style={styles.icon} />
                            </Grid>

                            <Typography align={'center'} style={styles.box1} variant="display1">2. Get Selected</Typography>
                            <hr style={styles.divider} />
                            <Typography align={'center'} style={styles.box2} variant='headline'>Selections are made using a lottory system. Once you are selected, you will be able to purchase your ticket.</Typography>
                        </Grid>

                        <Grid item style={styles.box0}>
                            <Grid container justify={'center'}>
                                <ConfirmationNumber style={styles.icon} />
                            </Grid>

                            <Typography align={'center'} style={styles.box1} variant="display1">3. Buy Ticket</Typography>
                            <hr style={styles.divider} />

                            <Typography align={'center'} style={styles.box2} variant='headline'>Purchase your ticket to receive the event location and other important party details.</Typography>
                        </Grid>
                
                    </Grid>
                </Paper>
            </Grid>
        </div>



    );
}

HowItWorks.propTypes = {
    theme: PropTypes.object.isRequired,
};

export default withTheme()(HowItWorks); // Let's get the theme as a property