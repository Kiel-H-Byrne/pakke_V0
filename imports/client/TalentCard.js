import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
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
    const { classes } = this.props;

    if (this.props) {
      return (
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title}>
            {this.props.talent.talentType}
          </Typography>
          <Typography >
            {this.props.talent.name}
          </Typography>
          <Typography variant="caption">
            ${this.props.talent.fee}
          </Typography>
        </CardContent>
      </Card>
      )
    }
  }
}

TalentCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TalentCard);
