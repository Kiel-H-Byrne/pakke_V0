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
            <React.Fragment>
                <Grid container justify="center" alignItems="center" direction="column">
                    <Map />
                    <Paper align={'center'} style={{ marginTop: '1rem', width: '22rem' }}>
                        <Typography style={{ margin: '.5rem' }} variant='h4'>Local Experiences</Typography>
                    </Paper>
                </Grid>
                <Grid container alignItems="baseline" style={styles.cards} wrap="nowrap" className="scroll-wrapper-x" >
                    <EventList />
                </Grid>


{/*
            <Grid container justify={'center'} style={{ marginTop: '10%' }}>
              <Paper align={'center'}style={{width: 350}}>
                <Typography style={{margin: '2%'}} variant='h3'>Featured Events</Typography>
              </Paper>
            </Grid>
   
            <Grid container spacing={16} justify={'center'} style={styles.cards} >
                <FeaturedEventList />
            </Grid>
*/}
</React.Fragment>

        )
    }
};

export default withStyles(styles)(LandingPage);