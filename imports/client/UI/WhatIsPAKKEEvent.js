import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import EmailForm from './EmailInput';

function WhatIsPAKKEEvent(props) {

    const { theme } = props;
    //   const primaryText = theme.palette.text.primary;
    //   const primaryColor = theme.palette.primary.main;

    const styles = {
        wrapper: {
            padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
            marginBottom: '1rem',
        },
        box1: {
            padding: `.4rem 1rem`,
            color: theme.palette.text.primary,
        },
        paper1: {
            width: 350,
        },
        accent: {
            padding: '1rem',
            color: theme.palette.primary.light,
            backgroundColor: theme.palette.secondary.light,
        },
        fullWidth: {
            align: "center",
            margin: "auto",
            width: "100%"
        }
    };

    //style == className in these withTheme components

    return (
        <Grid container justify={'center'} alignItems={'center'} style={styles.wrapper}>
            <Grid item xs={12} sm={8}>
                <Paper elevation={2}>
                    <Typography variant='h4' align={'center'} style={styles.box1}>What is PAKKE?</Typography>
                    <Typography align={'justify'} variant={'subtitle1'} style={styles.box1}> 
                        PAKKE is the catalyst for building social capital. We curate experiential events and build tools so you can do it too! We believe that creativity and curiosity build trust & connect communities--which is why we facilitate unique experiences, with local artists, in all kinds of places! <br /><br />
                        Connect with us if you are an artist, or own an inclusive space to host amazing experiences. <br /><br />
                    </Typography>
                    <Grid container justify={'center'} alignItems ={'center'} direction={'column'}>
                        <Grid item xs={12}>
                            <Typography variant="h6" >Sign up to stay connected.</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <EmailForm />
                        </Grid>
                    </Grid>
                    <Typography variant={'overline'} align="center" style={styles.accent}> 
                        Discover unique surroundings, connect with new communities... Experience the creative in you!
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    );
}

WhatIsPAKKEEvent.propTypes = {
    theme: PropTypes.object.isRequired,
};

export default withTheme()(WhatIsPAKKEEvent); // Let's get the theme as a property
