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
            <Typography align={'center'} variant={'title'} style={styles.box1}> 
                Here at PAKKE, we don’t believe in following the status quo. We want to pursue our passions. We yearn to explore the uncommon. We’re over doing what’s ordinary and past dealing with superficial social scenes. We think that a little curiosity, a touch of courage and a willingness to shake things up a bit can lead to some phenomenal outcomes. We know that there’s a lot happening in this wacky world of ours, and we want to figure it out where our PAKKE fits into it.
                <br /><br />
                Discover your surroundings, connect with new communities, experience the unfamiliar.
            </Typography>
        </Grid>
    </Grid>
    );
}

WhatIsPAKKEEvent.propTypes = {
    theme: PropTypes.object.isRequired,
};

export default withTheme()(WhatIsPAKKEEvent); // Let's get the theme as a property
