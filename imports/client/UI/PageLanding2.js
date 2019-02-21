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
import { Link } from 'react-router-dom';

import muiTheme from '../UI/muiTheme';
import WhatIsPAKKEEvent from '../UI/WhatIsPAKKEEvent';
import CoreValues from '../UI/CoreValues';
import Hero from '../UI/Hero';
import EventList from '../EventList';
import FeaturedEventList from '../FeaturedEventList';
import AddVenueForm from '../forms/AddVenueForm';
import AddEventModal from '../forms/AddEventModal';

const styles = theme => ({
  root: {
    flexGrow: 1,
    // background: 'black',
    background: 'url(img/holders/grey_sandbag.png)'
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
    margin: 30,
  }

});


class PageLanding2 extends Component {

  render() {
    const loginAlert = () => {
      // scrollToTop();   
      window.scrollTo({top: 0, behavior: "smooth"});
      Bert.alert({
        message: "Please Log In First.", 
        type: "login-alert",
        style: "growl-top-left",
        icon: 'fa-sign-in'
      });
    }
    const trackClick = (name, source, color, text) => {
      analytics.track("Button Clicked", {
        name: name,
        source: source,
        color: color,
        text: text
      });
    }
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
            <CoreValues />
            
            {thisUser ? (
              <div className='host-button'>
                {/* <AddEventModal user={thisUser}/> */}
                <Button component={Link} to="/addevent" className={classes.button} onMouseUp={trackClick("Top LoggedIn Host Button Clicked", "Home Page","#FFC429","Create your Experience")}>Create your Experience</Button> 

              </div>
            ) : (
              <div className='host-button'>
                <Button variant="contained" size="large" className={classes.button} onClick={loginAlert} onMouseUp={trackClick("Top Host Button Clicked", "Home Page","#FFC429","Become a Host!")}>Become a Host</Button>
              </div>
            )}

            <Grid container justify='center' style={{ marginTop: '3%' }}>
              <Paper align={'center'}style={{width: 350}}>
                <Typography style={{margin: '3%'}} variant='h4'> Local Experiences</Typography>
              </Paper>
            </Grid>
            <Grid container alignItems="baseline" style={styles.cards} wrap="nowrap" className="scroll-wrapper-x" >
                <EventList />
            </Grid>

            {thisUser ? (
              <div className='host-button'>
                {/* <AddEventModal user={thisUser}/> */}
                <Button component={Link} to="/addevent" style={{margin: 30, backgroundColor: "#FFC429",color: "#666"} } onClick={trackClick("Bottom LoggedIn Host Button Clicked", "Home Page","#FFC429","Host Your PAKKE!")}>Host Your PAKKE!</Button> 
              </div>
            ) : (
              <div className='host-button'>
                <Button variant="contained" size="large" style={{margin: 30, backgroundColor: "#FFC429",color: "#666"}} 
                  onClick={loginAlert} onMouseUp={trackClick("Bottom Host Button Clicked", "Home Page","#FFC429","Host Your PAKKE!")} >
                  Host Your PAKKE!</Button>
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
