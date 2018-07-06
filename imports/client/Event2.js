import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { _ } from 'underscore';

import EditEventButton from './forms/EditEventButton.js'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';

import Grid from '@material-ui/core/Grid';

const styles = {
            card: {
                maxWidth: 350,
                minWidth: 350,
                margin: '2rem'
                // display: 'flex',
            },
            image: {
                height: 200,
                justifyContent: 'flex-start',

            },
            date: {
                background: 'rgba(255,255,255,.9)',
                width: 100,
                height: 100,
                // border: '1px solid black',
                alignItems: 'center',
            },
            typo: {
                marginTop: 5,
            },

            media: {
                height: 0,
                paddingTop: '56.25%', // 16:9
            },
            actions: {
                justifyContent: 'space-between',
            },
            logo: {
                maxWidth: 75,
            },
            ordinal: {
                position: 'relative',
                verticalAlign: 'super',
                fontSize: '1.5rem',
                left: '-.3rem',
            },
        };

export default class Event extends Component {
    constructor(props) {
        super(props)
        this.state = {
          eventHost: Meteor.users.findOne({_id: this.props.event.hostId}),
          isHost: false,
          soldOut: false,
          isConfirmed: false
        }
        if (Meteor.userId() == this.props.event.hostId) { this.state.isHost = true }
        if (this.props.event.confirmedList.includes(Meteor.userId())) { this.state.isConfirmed = true }

        let confirmedCount = 0;
        if (this.props.event.confirmedList) {
            confirmedCount = this.props.event.confirmedList.length;
        }
        let remainingTickets = this.props.event.size - confirmedCount;
        if (remainingTickets === 0) {this.state.soldOut = true}


    }

    render() {
        let confirmedCount = 0;
        if (this.props.event.confirmedList) {
            confirmedCount = this.props.event.confirmedList.length;
        }
        let weight = ((confirmedCount / this.props.event.size) * 100).toFixed();

        let remainingTickets = this.props.event.size - confirmedCount;
        // if (remainingTickets === 0) {this.setState({soldOut: true})}
        const dateArr = this.props.event.date.toDateString().split(' ');

        const eventDate = _.object(["day","month","date","year"], dateArr)
        
        const nth = function(d) {
            if(d>3 && d<21) return 'th';
            switch (d % 10) {
                case 1:  return "st";
                case 2:  return "nd";
                case 3:  return "rd";
                default: return "th";
            }
        };
        

        return (
            <Grid item>
                
                    <Card style={styles.card}>
                        <Link className='event-card-link' to={`/event/${this.props.event._id}`}>
                            <CardMedia style={styles.image} image={this.props.event.image ? this.props.event.image : `""` }>
                                <CardContent >
                                    <Card style={styles.date}>
                                        <Typography style={styles.typo} align={'center'} variant={'display1'} color={'secondary'}> {eventDate.month}</Typography>
                                        <Typography align={'center'} variant={'display2'}>{ eventDate.date}<span style={styles.ordinal}> {nth(eventDate.date) }</span></Typography>
                                        <Typography align={'center'} variant={'display1'} color={'secondary'}>{eventDate.day}</Typography>
                                    </Card>
                                </CardContent>
                            </CardMedia>

                            <CardContent>
                                <Typography gutterBottom variant="display1" component="h2">{this.props.event.byline}</Typography>
                                <Typography variant="headline" component="h3">{this.props.event.eventAddress.state}, {this.props.event.eventAddress.zip} </Typography>
                                {/*
                                <Typography variant='headline' component='p'><strong>{this.props.event.size}</strong> tickets available 
                                     <strong>{remainingTickets}</strong> remain
                                </Typography>
                                */}
                            </CardContent>
                        </Link>
                        <CardActions style={styles.actions}>
                        {this.state.isHost ? ( <EditEventButton event={this.props.event} />) : this.state.soldOut ? (
                          <Button size="large" disabled >Sold Out</Button>
                        ) : this.state.isConfirmed ? (
                          <Button component={Link} to={`/event/${this.props.event._id}`}>View Details</Button>  
                        ) : (
                          <Button component={Link} to={`/event/${this.props.event._id}`}>Buy Ticket</Button>
                        )}
                        
                            {/*<img src="ImageLogoBlack.png" style={styles.logo} /> */}
                        </CardActions>
                    </Card>
            </Grid>
        );
    }
}
