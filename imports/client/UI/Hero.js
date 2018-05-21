import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Card, { CardActions, CardContent, CardMedia } from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Parallax } from 'react-scroll-parallax';
// import image2 from './triangleWhite.png';
import EmailInupt from './EmailInput';
// import image1 from './ImageHero.jpg';



const styles = theme => ({

    image: {
        // height: '100%',
        // width: '100%',
        maxHeight: 300,
        minHeight: 700,
        // minWidth: '100%',
        // objectFit: 'cover',
        // zIndex: -1,
    },
    headlineText: {
        color: 'white',
        fontWeight: 'bold',
    },
    subheadingText: {
        color: 'white',
        
    },
    triangle: {
        marginTop: '3%',
        maxHeight: '22rem',
    },
    button: {
        margin: '10%',
    },

});

// black image="http://webapp.blackscreen1.com/img/blackscreen1logo.jpg"
// white https://www.publicdomainpictures.net/pictures/30000/velka/plain-white-background.jpg
// gray https://i1.wp.com/www.solidcolore.com/3840/5b5b5b_background.jpg

// 
// https://images.unsplash.com/photo-1506774518161-b710d10e2733?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2ff076230a3aea325e5b1ce3f6a7a208&auto=format&fit=crop&w=2100&q=80

function Hero(props) {

    const { classes } = props;

    return (
    <Card>
        <CardMedia className={classes.image} image="/ImageHero.jpg" >
            <CardContent className={classes.cardContent}>
                <Parallax offsetYMax={20} offsetYMin={-20} slowerScrollRate tag="figure">
                    <Grid container justify={'center'}>
                        <img src="/ImageTriangleWhite.png" className={classes.triangle}></img>
                    </Grid>
                    <Typography className={classes.headlineText} align={'center'} variant='display4' gutterBottom>It's Happening, Go Find It.</Typography>
                    <Typography className={classes.subheadingText} align={'center'} variant='display2'>Discover | Connect | Experience</Typography>
                    <Grid container style={{ marginTop: '2%' }} justify={'center'} alignItems ={'center'} dirction={'column'}>
                        <Grid item>
                            <Grid container justify={'center'} alignItems ={'center'} dirction={'column'}>
                                {/* <Typography align={'center'}>
                                    <EmailInupt />
                                </Typography> */}

                                <Typography align={'center'}>
                                    <Button variant='raised' color="secondary" size={'large'}>Join Us</Button>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>


                </Parallax>
            </CardContent>
        </CardMedia>
    </Card>
    )
};

Hero.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Hero);