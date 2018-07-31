import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


function WhatIsPAKKEEvent(props) {

    const { theme } = props;
    //   const primaryText = theme.palette.text.primary;
    //   const primaryColor = theme.palette.primary.main;

    const styles = {
        wrapper: {
            marginTop: theme.spacing.unit * 8,
            padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
        },
        box1: {
            // padding: `${theme.spacing.unit}em ${theme.spacing.unit * 2}em`,
            color: theme.palette.text.primary,
        },
        paper1: {
            width: 350,
        }
    };

    //style == className in these withTheme components

    return (
    <Grid container justify={'center'} alignItems={'center'} style={styles.wrapper}>
        <Grid item xs={12} lg={8}>
            <Typography align='center' variant='display1' style={styles.box1}>PAKKE events encourage you to discover unique environments, connect with new people, and experience more in your city.
            </Typography>
        </Grid>
    </Grid>
    );
}

WhatIsPAKKEEvent.propTypes = {
    theme: PropTypes.object.isRequired,
};

export default withTheme()(WhatIsPAKKEEvent); // Let's get the theme as a property
