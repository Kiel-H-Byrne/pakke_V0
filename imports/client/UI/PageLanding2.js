import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { WithStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { ParallaxProvider } from 'react-scroll-parallax';
import Typography from '@material-ui/core/Typography/Typography';

import muiTheme from '../UI/muiTheme';
import WhatIsPakkeEvent from '../UI/WhatIsPakkeEvent';
import HowItWorks from '../UI/HowItWorks';
import Hero from '../UI/Hero';
import EventList from '../EventList';

const styles = theme => ({
  root: {
    flexGrow: 1,
    // background: 'black',
    background: 'url(http://www.designbolts.com/wp-content/uploads/2013/02/Sandbag-Grey-Seamless-Pattern-For-Website-Background.jpg)',

  },
  cards: {
    marginTop: theme.spacing.unit * 5,
  },

  whatIsPakkeEvent: {
    marginTop: theme.spacing.unit * 5,
    height: 400,
    // background: theme.palette.secondary.light
  },
  triangle: {
    maxHeight: 50,
  }

});

class PageLanding2 extends Component {

  render() {

    const { classes } = this.props;

    return (
      <ParallaxProvider>
        {/* <MuiThemeProvider theme={muiTheme}> */}
          <div className={classes.root}>
            <Hero />
            <WhatIsPakkeEvent />
            <HowItWorks />



            <Grid container justify={'center'} style={{ marginTop: '10%' }}>
              <Paper align={'center'}style={{width: 350}}>
                <Typography style={{margin: '5%'}} variant='display2'>Pakke Inspired Events</Typography>
              </Paper>
            </Grid>
            <Grid container spacing={16} justify={'center'} className={classes.cards} >
                <EventList className={classes.card} />
            </Grid>
          </div>



        {/* </MuiThemeProvider > */}
      </ParallaxProvider>
    );

  }

}

PageLanding2.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PageLanding2);
