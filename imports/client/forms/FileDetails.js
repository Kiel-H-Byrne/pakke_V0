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
    maxWidth: 145,
  },
  media: {
    minHeight: 100,
    maxWidth: 145
  },
};

class FileDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
    
  }

  propTypes: {
    fileName: PropTypes.string.isRequired,
    fileSize: PropTypes.number.isRequired,
    fileId: PropTypes.string.isRequired,
    fileUrl: PropTypes.string,
    fileExt: PropTypes.string
  }

  replaceFile = () => {
    let conf = confirm('Are you sure you want to delete the file?') || false;
    if (conf == true) {
      this.props.clearFile()
      Meteor.call('s3Remove', this.props.s3path)
    }
  }

  render() {
    const { classes } = this.props;
    return (
    <div>
      <Card className={classes.card}>
        {this.props.fileExt == "svg" || "jpeg" || "jpg" || "png" || "gif" ? (
          <img src={this.props.fileUrl} className={classes.media} title={this.props.fileName} alt="Image Upload" />
        ) : (
          <CardMedia
          className={classes.media}
          component="video"
          controls
          src={this.props.fileUrl}
          title={this.props.fileName}
        />
        )}
        <CardActions>
          <Button size="small" onClick={this.replaceFile} >
            Change Image
          </Button>
        </CardActions>
      </Card>
     </div>
      )
  }
}

FileDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FileDetails);
