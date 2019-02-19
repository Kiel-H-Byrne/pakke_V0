import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    maxWidth: 175,
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};


class TalentCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, talent } = this.props;
    if (this.props) {
      return (
              <Grid item>
                    <Card style={talent.featured ? styles.featured : styles.card}>
                        <Link className='event-card-link' to={`/event/${talent._id}`}>
                            <CardMedia style={styles.image} image="https://picsum.photos/200/300/?random" } />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">{talent.name}</Typography>
                                <Typography gutterBottom variant="caption" dangerouslySetInnerHTML={{}} />
                                {/*
                                                                  // __html: talent.description.substring(0, 100)+'...
                                <Typography variant="h5" component="h3">{talent.eventAddress.state}, {talent.eventAddress.zip} </Typography>
                                <Typography variant='headline' component='p'><strong>{talent.size}</strong> tickets available 
                                     <strong>{remainingTickets}</strong> remain
                                </Typography>
                                */}
                            </CardContent>
                        </Link>
                        <CardActions style={styles.actions}>
                            <Button component={Link} to={`/event/${talent._id}`}>View Details</Button>
                        </CardActions>
                    </Card>
            </Grid>
      )
    }
  }
}

TalentCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TalentCard);