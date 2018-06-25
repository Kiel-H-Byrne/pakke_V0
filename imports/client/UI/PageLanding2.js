import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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
import FeaturedEventList from '../FeaturedEventList';

const styles = theme => ({
  root: {
    flexGrow: 1,
    // background: 'black',
    background: 'url(https://www.designbolts.com/wp-content/uploads/2013/02/Sandbag-Grey-Seamless-Pattern-For-Website-Background.jpg)',

  },
  cards: {
    marginTop: theme.spacing.unit * 5,
  },
  featured: {
    backgroundColor: 'rgba(34,97,153,0.2)',
    display: 'flex'
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

            <Grid container justify='center' style={{ marginTop: '10%' }}>
              <Paper align={'center'}style={{width: 350}}>
                <Typography style={{margin: '3%'}} variant='display2'> Events</Typography>
              </Paper>
            </Grid>
            <div className={`${classes.cards} scroll-wrapper-x`} >
                {/*
                <div className={classes.featured} > 
                  <FeaturedEventList /> 
                   <Paper justify='center' align={'center'} style={{width: '100%', display:'block', clear: 'both'}}>
                    <Typography style={{backgroundColor: '#226199', color: 'white'}} variant='display2'> Featured</Typography>
                  </Paper>
                
                </div>
                */}
                <EventList  />
            </div>
          </div>
      </ParallaxProvider>
    );

  }

}

PageLanding2.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PageLanding2);
