import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography/Typography';
import Paper from '@material-ui/core/Paper';


import EventList from './EventList';
import FeaturedEventList from './FeaturedEventList';
import Map from './Map';


class LandingPage extends Component {

    render() {

        const styles = {
            cards: {
                marginTop: '2%',
            },
        };

        return (
            // <div>
            <div className="landingMap">
                    <Map />

                <Grid container justify={'center'} style={{ marginTop: '3%' }}>
                    <Paper align={'center'} style={{ width: 350 }}>
                        <Typography style={{ margin: '3%' }} variant='display2'>Local Experiences</Typography>
                    </Paper>
                </Grid>
                <Grid container spacing={16} justify={'center'} style={styles.cards} >
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

export default LandingPage;