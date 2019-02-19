import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withStyles } from '@material-ui/core/styles';
import { BarLoader } from 'react-spinners';
// import Redirect from 'react-router';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Events from '../startup/collections/events';
import Event from './Event';
import PageError from './PageError';

const styles = {
  profileForm: {
    display: 'none',
    maxWidth:'960px',
    minWidth: '420px',
    transition: 'visibility 0s, opacity 0.5s linear',
    padding: '1rem',
    fontSize: '.8rem'
  },
  avatar: {
    height: 0,
    paddingTop: '56.25%',
  },
  card: {
    width: 250,
    // display: 'flex',
  }
}

class UserProfileComponent extends Component {
  constructor(props) {
    super(props)
    // this.handleChange = this.handleChange.bind(this)
    // this.state = {
    //   value: 0
    // }
    console.log(props)
  }

  render() {
    if (this.props.loading) {
      return (
        <div>
          <BarLoader 
              loading={this.props.loading} 
              color='#2964ff' 
              width={-1}
              height={10}
            />
        </div>
      )
    }
    // console.log(this);
    if (!this.props.thisUser) {
      return (<PageError />)
    }
    const thisProfile = this.props.thisUser.profile;

    return (
      <Grid item>
        <Card style={styles.card}>
          {thisProfile.avatar ? (
            <CardMedia style={styles.avatar} image={thisProfile.avatar} > 
            </CardMedia>
          ) : (
            <CardMedia style={styles.avatar} image='/missing_profile.png' > 
            </CardMedia>
          )}
          <CardContent className='profile-head-text'>
            {(thisProfile.name) ? (
              <Typography variant="subtitle1" align="center">I'm {thisProfile.name}!</Typography>
            ) : (
                <h4> I'm new here! </h4>
              )
            }
            {thisProfile.birthDate ? (
              <Typography variant="caption" align="center">Birthday: {thisProfile.birthDate.toDateString().substring(0, (thisProfile.birthDate.toDateString()).length - 5)}</Typography>
              ) : ''}
            {thisProfile.social && thisProfile.social.facebook ? (
              <Typography variant="caption" >FB: <a target="_blank" href={`https://www.facebook.com/${thisProfile.social.facebook}`}>@{thisProfile.social.facebook}</a></Typography>
              ) : ''}
            {thisProfile.social && thisProfile.social.instagram ? (
              <Typography variant="caption" >IG: <a target="_blank" href={`https://www.instagram.com/${thisProfile.social.instagram}`}>@{thisProfile.social.instagram}</a></Typography>
              ) : ''}
            {thisProfile.bio ? ( 
              <Typography variant="caption" align="left" dangerouslySetInnerHTML={{__html: thisProfile.bio}} />
              ) : ''}
            <Button component={Link} to={`/events/${this.props.match.params.userId}`} size="small" variant="contained">View Events</Button>
          </CardContent>
        </Card>
      </Grid>
    )
  }
}

export default UserProfile = withTracker( props => {
  const uid = props.match.params.userId;
  const handle = Meteor.subscribe('publicUser', uid);
  const loading = !handle.ready();
  const thisUser = Meteor.users.findOne(uid);

  return {
    loading,
    thisUser
  };
})(UserProfileComponent)