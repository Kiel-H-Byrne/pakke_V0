import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography/Typography';
import Paper from 'material-ui/Paper';


import EventList from './EventList';
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

                <Grid container justify={'center'} style={{ marginTop: '2%' }}>
                    <Paper align={'center'} style={{ width: 350 }}>
                        <Typography style={{ margin: '2%' }} variant='display2'>Pakke Inspired Events</Typography>
                    </Paper>
                </Grid>

                <Grid container spacing={16} justify={'center'} style={styles.cards} >
                    <EventList />
                </Grid>
            </div>
        )
    }
};

export default LandingPage;