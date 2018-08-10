import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Helmet} from "react-helmet";

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { ParallaxProvider } from 'react-scroll-parallax';
import Typography from '@material-ui/core/Typography/Typography';
import Button from '@material-ui/core/Button';

import muiTheme from '../UI/muiTheme';
import WhatIsPAKKEEvent from '../UI/WhatIsPAKKEEvent';
import HowItWorks from '../UI/HowItWorks';
import Hero from '../UI/Hero';
import EventList from '../EventList';
import FeaturedEventList from '../FeaturedEventList';
import AddVenueForm from '../forms/AddVenueForm';
import AddEventModal from '../forms/AddEventModal';

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
  whatIsPAKKEEvent: {
    marginTop: theme.spacing.unit * 5,
    height: 400,
  },
  triangle: {
    maxHeight: 50,
  },
  button: {
    marginBottom: 30,
  }

});


class PageLanding2 extends Component {

  render() {
    const loginAlert = () => Bert.alert("Please Log In First.", "info", "growl-top-right");
    
    const thisUser = Meteor.user();
    const { classes } = this.props;

    return (
            <React.Fragment>
      <Helmet>
        <title>PAKKE.US </title>
        <meta name="description" content="Discover | Connect | Experience"/>
        <meta name="keywords" content={`Night Life, Nightlife, Night Out, Social Events, Parties in DC, Events in DC`}/>
        <meta property="og:title" content="PAKKE" />
        <meta property="og:image" content="https://www.pakke.us/img/brand/SOCIAL/Logo_Facebook_wordmark.jpg" />
        <meta property="og:image:secure_url" content="https://www.pakke.us/img/brand/SOCIAL/Logo_Facebook_wordmark.jpg" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="529" />
        <meta property="og:image:height" content="529" />
        <meta property="og:image:alt" content="P, Delta, K, K, E" />
        <meta property="og:url" content="https://www.pakke.us" />
        <meta property="og:description" content="Discover, Connect, Experience." />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PAKKE" />
        <meta name="twitter:description" content="Discover, Connect, Experience." />
        <meta name="twitter:url" content="https://www.pakke.us" />
        <meta name="twitter:image" content="https://www.pakke.us/img/brand/PAKKE_LOGO_black.png" />        
      </Helmet>
      <ParallaxProvider>
        {/* <MuiThemeProvider theme={muiTheme}> */}
          <div className={classes.root}>
            <Hero />
            <WhatIsPAKKEEvent />
            <HowItWorks />

            <Grid container justify='center' style={{ marginTop: '3%' }}>
              <Paper align={'center'}style={{width: 350}}>
                <Typography style={{margin: '3%'}} variant='display1'> Local Experiences</Typography>
              </Paper>
            </Grid>
            <Grid container alignItems="baseline" style={styles.cards} wrap="nowrap" className="scroll-wrapper-x" >
                {/*
                <div className={classes.featured} > 
                  <FeaturedEventList /> 
                   <Paper justify='center' align={'center'} style={{width: '100%', display:'block', clear: 'both'}}>
                    <Typography style={{backgroundColor: '#2964ff', color: 'white'}} variant='display2'> Featured</Typography>
                  </Paper>
                
                </div>
                */}
                <EventList  />
            </Grid>
            {thisUser ? (
              <div className='host-button'>
                <AddEventModal user={thisUser}/>
              </div>
            ) : (
              <div className='host-button'>
                <Button variant="raised" size="large" className={classes.button} onClick={loginAlert} >Become a Host</Button>
              </div>
            )}
          </div>
      </ParallaxProvider>
      </React.Fragment>
    );

  }

}

PageLanding2.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PageLanding2);
