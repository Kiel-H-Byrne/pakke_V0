import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    margin: 11,
    maxWidth: 275,
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  image: {
    position: "relative",
    height: 160
  },
  priceBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 11,
    fontSize: ".8rem",
    backgroundColor: "#226199"
  }
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
                            <CardMedia style={styles.image} image={ talent.avatar || `https://picsum.photos/200/300/?random&${Math.floor(Math.random() * Math.floor(100))}`}>
                              <Avatar style={styles.priceBadge}>${talent.fee}</Avatar>
                            </CardMedia>

                            <CardContent>
                                <Typography gutterBottom variant="body1" component="p">"<Typography inline variant="overline" color="textSecondary">{talent.name}</Typography>" has {talent.experience} years of experience as a <em style={{color: "#ffa07a"}}>{talent.talentType}</em>. They prefer an audience size of around {talent.audienceSize} people.
                                </Typography>
                            </CardContent>
                        </Link>
                        <CardActions style={styles.actions}>
                            <Button component={Link} to={`/event/${talent._id}`}>Book Artist</Button>
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