import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 240,
    width: 320
  },
};

class IndividualFile extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
    
    this.removeFile = this.removeFile.bind(this);
  }

  propTypes: {
    fileName: PropTypes.string.isRequired,
    fileSize: PropTypes.number.isRequired,
    fileId: PropTypes.string.isRequired,
    fileUrl: PropTypes.string,
    fileExt: PropTypes.string
  }

  removeFile() {
    let conf = confirm('Are you sure you want to delete the file?') || false;
    if (conf == true) {
      Meteor.call('removeFile', this.props.fileId, function (err, res) {
        if (err)
          console.log(err);
      })
    }
  }

  render() {
    const { classes } = this.props;

    return (
    <div>
      <Card className={classes.card}>
        {this.props.fileExt == "jpg" || "png" || "gif" ? (
          <CardMedia 
          className={classes.media}
          image={this.props.fileUrl}
          title={this.props.fileName}
          />                              
        ) : (
          <CardMedia
          className={classes.media}
          component="video"
          controls
          src={this.props.fileUrl}
          title={this.props.fileName}
        />
        )}
        
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {this.props.fileName}
          </Typography>
          <Typography component="p">
          Size: {this.props.fileSize}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={this.removeFile} >
            Delete
          </Button>
        </CardActions>
      </Card>
     </div>
      )
  }
}

IndividualFile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IndividualFile);
