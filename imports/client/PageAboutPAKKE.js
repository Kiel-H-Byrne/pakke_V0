import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
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

import WhatIsPAKKEEvent from './UI/WhatIsPAKKEEvent'
import CoreValues from './UI/CoreValues'

function PageAboutPAKKE(props) {

    const { theme } = props;
    //   const primaryText = theme.palette.text.primary;
    //   const primaryColor = theme.palette.primary.main;
    //   const primaryText = theme.palette.text.primary;
    //   const primaryColor = theme.palette.primary.main;

    const styles = {
        wrapper: {
            flexGrow: 1,
            // margin: `${theme.spacing.unit * 10} ${0} `,
            // background: theme.palette.secondary.main,
            // background: 'url(https://www.designbolts.com/wp-content/uploads/2013/02/Sandbag-Grey-Seamless-Pattern-For-Website-Background.jpg)',
            height: '100%',
        },
        wrapper1: {
            marginTop: theme.spacing.unit * 8,
            padding: `${theme.spacing.unit}px ${theme.spacing.unit * 1.5}px`,
        },
        paper: {
            // background: theme.palette.primary.light,
            width: '100%',
        },
        box1: {
            padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
        },
        box2: {
            padding: `${theme.spacing.unit}px ${theme.spacing.unit * 1.5}px`,
            marginBottom: '2rem',
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
        },
        paper1: {
            width: 350,
        },
        cofounderBox: {
            width: 275,
            // background: 'black',
        }
    }
        ;

    //style == className in these withTheme components



    return (
        <div id="PageAboutPAKKE">
            <WhatIsPAKKEEvent style={styles.box2}/>
            <CoreValues />
            <Grid container justify={'center'} style={styles.wrapper}>
                <Paper style={styles.paper}>
                            <Typography variant='h4' component="h1" align={'center'} style={styles.box1}>Who is PAKKE?</Typography>
                    <Grid container justify={'center'} style={{ marginTop: '1%' }}>
                        <Grid item xs={12} sm={3} style={styles.cofounderBox}>
                            <a href="https://www.linkedin.com/in/emmett-ferra-54231a31/"><Typography align={'center'} style={styles.box1} variant="h6" component="h1">Emmett Ferra</Typography></a>
                            <hr style={styles.divider} />
                            <Typography align={'center'} style={styles.box2} variant="subtitle1">CEO & Co-founder</Typography>
                        </Grid>

                        <Grid item xs={12} sm={3} style={styles.cofounderBox}>
                            <a href="https://www.linkedin.com/in/kielbyrne/"><Typography align={'center'} style={styles.box1} variant="h6">Kiel Byrne</Typography></a>
                            <hr style={styles.divider} />
                            <Typography align={'center'} style={styles.box2} variant='subtitle1'>Technical Co-founder</Typography>
                        </Grid>

                        <Grid item xs={12} sm={3} style={styles.cofounderBox}>
                            <a href="https://www.linkedin.com/in/amy-mcgovern-morse-9b0aa63/"><Typography align={'center'} style={styles.box1} variant="h6">Amy Morse</Typography></a>
                            <hr style={styles.divider} />
                            <Typography align={'center'} style={styles.box2} variant='subtitle1'>Chief Experience Coordinator</Typography>
                        </Grid>
                        <Grid item xs={12} sm={3} style={styles.cofounderBox}>
                            <a href="https://www.linkedin.com/in/samuelfeigenbaum/"><Typography align={'center'} style={styles.box1} variant="h6">Sam Feigenbaum</Typography></a>
                            <hr style={styles.divider} />
                            <Typography align={'center'} style={styles.box2} variant='subtitle1'>Code Wizard</Typography>
                        </Grid>

                    </Grid>
                </Paper>
            </Grid>
        </div>

    );
}

PageAboutPAKKE.propTypes = {
    theme: PropTypes.object.isRequired,
};

export default withTheme()(PageAboutPAKKE); // Let's get the theme as a property