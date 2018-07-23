import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
            <Grid container alignItems="baseline" justify="center" style={styles.cards} wrap="nowrap" className="scroll-wrapper-x" >
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
    );

  }

}

PageLanding2.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PageLanding2);
