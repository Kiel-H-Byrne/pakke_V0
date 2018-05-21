import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';



export default class Event2 extends Component {

    render() {

        let confirmedCount = 0;
        if (this.props.event.confirmedList) {
            confirmedCount = this.props.event.confirmedList.length;
        }
        let weight = ((confirmedCount / this.props.event.size) * 100).toFixed();
        const style = {
            width: `${weight}%`
        };

        let remainingTickets = this.props.event.size - confirmedCount;
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

        const styles = {
            card: {
                maxWidth: 350,
                minWidth: 350,
                height: '100%',
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
                marginTop: 10,
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
            }
        };

        return (
            <Grid item>
                <Link className='event-card-link' to={`/event/${this.props.event._id}`}>
                    <Card style={styles.card}>

                        <CardMedia style={styles.image} image={this.props.event.image}>
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

                            <Typography variant="headline" component="p">{this.props.event.price}$ per person </Typography>
                            <Typography variant='headline' component='p'><strong>{this.props.event.size}</strong> tickets available | <strong>{remainingTickets}</strong> remain</Typography>
                        </CardContent>
                        <CardActions style={styles.actions}>
                            <Button size="large" color="secondary">Apply</Button>
                            <img src="ImageLogoBlack.png" style={styles.logo} />
                        </CardActions>
                    </Card>
                </Link>
            </Grid>
        );
    }
}

// Event2.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(Event2);