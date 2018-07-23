import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography/Typography';
import Paper from '@material-ui/core/Paper';


import EventList from './EventList';
import FeaturedEventList from './FeaturedEventList';
import Map from './Map';

const styles = (theme) => ({
    cards: {
        marginTop: theme.spacing.unit * 5,
    },
});

class LandingPage extends Component {

    render() {
        return (
            <div className="landingMap">
                <Grid container justify="center" alignItems="center" direction="column">
                    <Map />
                    <Paper align={'center'} style={{ marginTop: '3%', width: '22rem' }}>
                        <Typography style={{ margin: '3%' }} variant='display1'>Local Experiences</Typography>
                    </Paper>
                </Grid>
                <Grid container alignItems="baseline" justify="center" style={styles.cards} wrap="nowrap" className="scroll-wrapper-x" >
                    <EventList />
                </Grid>


{/*
            <Grid container justify={'center'} style={{ marginTop: '10%' }}>
              <Paper align={'center'}style={{width: 350}}>
                <Typography style={{margin: '2%'}} variant='display2'>Featured Events</Typography>
              </Paper>
            </Grid>
   
            <Grid container spacing={16} justify={'center'} style={styles.cards} >
                <FeaturedEventList />
            </Grid>
*/}
</div>

        )
    }
};

export default withStyles(styles)(LandingPage);