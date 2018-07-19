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


function PageAboutPAKKE(props) {

    const { theme } = props;
    //   const primaryText = theme.palette.text.primary;
    //   const primaryColor = theme.palette.primary.main;
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
        wrapper1: {
            marginTop: theme.spacing.unit * 8,
            padding: `${theme.spacing.unit}px ${theme.spacing.unit * 1.5}px`,
        },
        paper: {
            // background: theme.palette.primary.light,
            width: '100%',
        },
        box0: {
            width: 375,

        },
        box1: {
            padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
        },
        box2: {
            padding: `${theme.spacing.unit}px ${theme.spacing.unit * 1.5}px`,
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
                        <Typography align={'center'} variant={'display2'} style={styles.box1}>PAKKE events encourage you to discover unique environments, connect with new people, and experience more in your city.</Typography>
                    </Grid>
                </Grid>
                {/* </Paper> */}
            </Grid>


            <Grid container justify={'center'} style={styles.wrapper}>
                <Paper style={styles.paper}>
                    <Grid container justify={'center'} style={{ marginTop: '1%' }} >
                        <Grid item>
                            <Typography variant='display2' component="h1" align={'center'} style={styles.box1}>What does PAKKE do?</Typography>
                        </Grid>
                    </Grid>



                    <Grid container justify={'center'} style={{ marginTop: '1%' }}>

                        <Grid item style={styles.box0}>
                            <Grid container justify={'center'}>
                                <Launch style={styles.icon} />
                            </Grid>
                            <Typography align={'center'} style={styles.box1} variant="display1" component="h1">Guests</Typography>
                            <hr style={styles.divider} />
                            <Typography align={'center'} style={styles.box2} variant="headline">PAKKE’s vision is to focus on the overall experience of how we socialize and more importantly, where and with who. As a guest, this is your opportunity to meet new people, learn about your city, and save money.</Typography>
                        </Grid>

                        <Grid item style={styles.box0}>
                            <Grid container justify={'center'}>
                                <EventAvailable style={styles.icon} />
                            </Grid>

                            <Typography align={'center'} style={styles.box1} variant="display1">Hosts</Typography>
                            <hr style={styles.divider} />
                            <Typography align={'center'} style={styles.box2} variant='headline'>The physical environment is just as important to a day or night out that, if done right, we are willing to open our doors as hosts for curated events. For all hosts, there will be a dedicated experience curator that will provide professional support so your event is successful and profitable.</Typography>
                        </Grid>

                        <Grid item style={styles.box0}>
                            <Grid container justify={'center'}>
                                <ConfirmationNumber style={styles.icon} />
                            </Grid>

                            <Typography align={'center'} style={styles.box1} variant="display1">Talent</Typography>
                            <hr style={styles.divider} />

                            <Typography align={'center'} style={styles.box2} variant='headline'>PAKKE believes in the power of experiences but finding ways to tap into a unique social outting, we need creative people to guide us there. This is why we pay very close attention to our talented professionals who choose PAKKE as a way to bring their art, craft or trade to our communities. Join us today and see how your talent can earn recognition and money.</Typography>
                        </Grid>

                    </Grid>
                </Paper>
            </Grid>


            <Grid container justify={'center'} style={styles.wrapper}>
                <Paper style={styles.paper}>
                    <Grid container justify={'center'} style={{ marginTop: '1%' }} >
                        <Grid item>
                            <Typography variant='display2' component="h1" align={'center'} style={styles.box1}>Who is PAKKE</Typography>
                        </Grid>
                    </Grid>



                    <Grid container justify={'center'} style={{ marginTop: '1%' }}>

                        <Grid item style={styles.cofounderBox}>
                            <Typography align={'center'} style={styles.box1} variant="display1" component="h1">Emmett Ferra</Typography>
                            <hr style={styles.divider} />
                            <Typography align={'center'} style={styles.box2} variant="headline">He brings the vision</Typography>
                        </Grid>

                        <Grid item style={styles.cofounderBox}>
                            <Typography align={'center'} style={styles.box1} variant="display1">Kiel Byrne</Typography>
                            <hr style={styles.divider} />
                            <Typography align={'center'} style={styles.box2} variant='headline'>He brings the tech</Typography>
                        </Grid>

                        <Grid item style={styles.cofounderBox}>
                            <Typography align={'center'} style={styles.box1} variant="display1">Amy Morse</Typography>
                            <hr style={styles.divider} />
                            <Typography align={'center'} style={styles.box2} variant='headline'>She brings the hustle</Typography>
                        </Grid>

                        <Grid item style={styles.cofounderBox}>
                            <Typography align={'center'} style={styles.box1} variant="display1">Zach Clement</Typography>
                            <hr style={styles.divider} />
                            <Typography align={'center'} style={styles.box2} variant='headline'>He brings the rest</Typography>
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