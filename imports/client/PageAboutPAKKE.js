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


function PageAboutPAKKE(props) {

    const { theme } = props;
    //   const primaryText = theme.palette.text.primary;
    //   const primaryColor = theme.palette.primary.main;
    //   const primaryText = theme.palette.text.primary;
    //   const primaryColor = theme.palette.primary.main;

    const styles = {
        wrapper: {
            flexGrow: 1,
            margin: `${theme.spacing.unit * 10} ${0} `,
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
            <Grid container justify={'center'} alignItems={'center'} style={styles.wrapper1}>
                <Grid item style={{ width: '100%', }}>
                    <Grid container justify={'center'} style={{ background: 'theme.palette.text.primary.main' }}>
                        <Typography variant='headline' align={'center'} style={styles.box1}>What is PAKKE?</Typography>
                        <Typography align={'justify'} variant={'body1'} paragraph={true} style={styles.box1}> 
                            Here at PAKKE, we don’t believe in following the status quo. We want to pursue our passions. 
                            We yearn to explore the uncommon. We’re done with doing what’s ordinary and past dealing with superficial social scenes. 
                            We think that a little curiosity, a touch of courage and a willingness to shake things up a bit can lead to some phenomenal outcomes. 
                            We know that there’s a lot happening in this wacky world of ours, and we want to figure out where our PAKKE fits into it.
                        </Typography>
                        <Typography   variant={'overline'} paragraph={true} style={styles.box1}> 
                            Discover your surroundings, connect with new communities... Experience the unfamiliar.
                        </Typography>
                    </Grid>
                </Grid>
                {/* </Paper> */}
            </Grid>


            <Grid container justify={'center'} style={styles.wrapper}>
                <Paper elevation={1} style={styles.paper}>
                    <Typography variant='headline' align={'center'} style={styles.box1}>What does PAKKE do?</Typography>
                    <Grid container justify={'center'} style={{ marginTop: '1%' }}>
                        <Grid item xs={12} md={4}>
                                <Launch style={styles.icon} />
                            <Typography align={'center'} style={styles.box1} variant="title" component="h1">Guests</Typography>
                            <hr style={styles.divider} />
                            <Typography align={'center'} style={styles.box2} variant="caption">PAKKE’s vision is to focus on the overall experience of how we socialize and more importantly, where and with who. As a guest, this is your opportunity to meet new people, learn about your city, and save money.</Typography>
                        </Grid>

                        <Grid item xs={12} md={4}>
                                <EventAvailable style={styles.icon} />
                            <Typography align={'center'} style={styles.box1} variant="title">Hosts</Typography>
                            <hr style={styles.divider} />
                            <Typography align={'center'} style={styles.box2} variant='caption'>The physical environment is just as important to a day or night out that, if done right, we are willing to open our doors as hosts for curated events. For all hosts, there will be a dedicated experience curator that will provide professional support so your event is successful and profitable.</Typography>
                        </Grid>

                        <Grid item xs={12} md={4}>
                                <ConfirmationNumber style={styles.icon} />
                            <Typography align={'center'} style={styles.box1} variant="title">Talent</Typography>
                            <hr style={styles.divider} />

                            <Typography align={'center'} style={styles.box2} variant='caption'>PAKKE believes in the power of experiences but finding ways to tap into a unique social outting, we need creative people to guide us there. This is why we pay very close attention to our talented professionals who choose PAKKE as a way to bring their art, craft or trade to our communities. Join us today and see how your talent can earn recognition and money.</Typography>
                        </Grid>

                    </Grid>
                </Paper>
            </Grid>


            <Grid container justify={'center'} style={styles.wrapper}>
                <Paper style={styles.paper}>
                            <Typography variant='headline' component="h1" align={'center'} style={styles.box1}>Who is PAKKE?</Typography>
                    <Grid container justify={'center'} style={{ marginTop: '1%' }}>

                        <Grid item style={styles.cofounderBox}>
                            <a href="https://www.linkedin.com/in/emmett-ferra-54231a31/"><Typography align={'center'} style={styles.box1} variant="title" component="h1">Emmett Ferra</Typography></a>
                            <hr style={styles.divider} />
                            <Typography align={'center'} style={styles.box2} variant="subheading">He brings the vision</Typography>
                        </Grid>

                        <Grid item style={styles.cofounderBox}>
                            <a href="https://www.linkedin.com/in/kielbyrne/"><Typography align={'center'} style={styles.box1} variant="title">Kiel Byrne</Typography></a>
                            <hr style={styles.divider} />
                            <Typography align={'center'} style={styles.box2} variant='subheading'>He brings the tech</Typography>
                        </Grid>

                        <Grid item style={styles.cofounderBox}>
                            <a href="https://www.linkedin.com/in/amy-mcgovern-morse-9b0aa63/"><Typography align={'center'} style={styles.box1} variant="title">Amy Morse</Typography></a>
                            <hr style={styles.divider} />
                            <Typography align={'center'} style={styles.box2} variant='subheading'>Chief Experience Coordinator</Typography>
                        </Grid>

                        <Grid item style={styles.cofounderBox}>
                            <a href="https://www.linkedin.com/in/samuelfeigenbaum/"><Typography align={'center'} style={styles.box1} variant="title">Sam Feigenbaum</Typography></a>
                            <hr style={styles.divider} />
                            <Typography align={'center'} style={styles.box2} variant='subheading'>Coding Wizard</Typography>
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