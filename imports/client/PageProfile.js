import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { BarLoader } from 'react-spinners';
import Redirect from 'react-router';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import InputLabel from '@material-ui/core/InputLabel';

import AutoField from 'uniforms-material/AutoField';
import AutoForm from 'uniforms-material/AutoForm';
import SubmitField from 'uniforms-material/SubmitField';
import TextField from 'uniforms-material/TextField';
import ErrorsField from 'uniforms-material/ErrorsField';

import Events from '../startup/collections/events';
import TinyInput from './forms/TinyInput.js'
import VenuesForm from './forms/VenuesForm';
import EditAvatarButton from './header/EditAvatarButton'
import Event from './Event';
import TabGuest from './TabGuest';
import TabHost from './TabHost';
import TabTalent from './TabTalent';
import LandingPage2 from './UI/PageLanding2';
import PageError from './PageError';


const styles = {
  profileForm: {
    display: 'none',
    maxWidth:'960px',
    minWidth: '420px',
    transition: 'visibility 0s, opacity 0.5s linear'
  },
  avatar: {
    height: 0,
    paddingTop: '56.25%',
  },
  card: {
    width: 250,
    margin: '1rem'
    // display: 'flex',
  }
}

class PageProfileComponent extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      value: 0
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log(nextProps, prevState)
    let eventHost;
    nextProps.event ? eventHost = Meteor.users.findOne(nextProps.event.hostId) : {}
    return {
      user: Meteor.user(),
      eventHost: eventHost
    };
  }

  componentWillUnmount() {
    this.props.handle.stop();
  }

  handleSubmit(doc) {
    Meteor.call('editProfile', doc)
  }
  
  handleChange(event,value) {
    this.setState({value})
  }

  handleClick(e) {

    let x = document.getElementById("profileForm");
    if (x.style.display === "none") {
        x.style.display = "block";
        x.style.opacity = 1;
    } else {
        x.style.display = "none";
        x.style.opacity = 0;
    }

  }

  handleSuccess() {
    Bert.alert("Your Profile Was Updated!", "success");
    $('#profileModal').modal('toggle');
  }

  render() {
    const { value } = this.state;

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

    let talentModel = Schema.Talent.clean({})
    let interestsModel = Schema.Interests.clean({})
    let venueModel = Schema.Venue.clean({})
    const thisProfile = this.props.thisUser.profile;

    const model = Schema.Profile.clean(thisProfile)

    // console.log(Schema.Profile.clean({'talents.$.talent': talentModel, 
    //                                  'interests': interestsModel, 
    //                                  'venues.$.venue': venueModel, 
    //                                  ...thisProfile
    //                                }));
    // const omitFields = ["talentId", "venue.$.venueId"];

      return (
        <Grid container
        direction="column"
        justify="center">
          <Grid item xs={12}>
            <Card style={styles.card}>
                {/*
                <EditAvatarButton />
                */}
                {this.props.thisUser.profile.avatar ? (
                  <CardMedia style={styles.avatar} image={this.props.thisUser.profile.avatar}  />
                ) : (
                    <CardMedia style={styles.avatar} image='/missing_profile.png' />
                  )}
              <CardContent className='profile-head-text'>
                  {(this.props.thisUser.profile.name) ? (
                    <Typography variant="title" align="center">I'm {this.props.thisUser.profile.name}</Typography>
                  ) : (
                      <h4> I'm a new user </h4>
                    )
                  }
                  <Button onClick={this.handleClick}>Edit Profile</Button>
                  <div id="profileForm" role="dialog" style={styles.profileForm}>
                    <h3>Profile</h3>
                    <AutoForm
                      schema={Schema.Profile}
                      model={model}
                      onSubmit={this.handleSubmit}
                      onSubmitSuccess={this.handleSuccess}
                      onSubmitFailure={this.handleFailure} 
                      className="tinyForm"
                      >

                      <AutoField name="name" />
                      <AutoField name="birthDate" />
                      <AutoField name="social" />
                      <InputLabel>Describe Yourself!</InputLabel>
                      <TinyInput name="bio" />
                      <SubmitField value="Submit" />
                      <ErrorsField />
                    </AutoForm>
                  </div>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12}>
            <Tabs value={value} onChange={this.handleChange} fullWidth centered>
              <Tab label="Guest" />
              <Tab label="Host" />
              <Tab label="Talent" />
            </Tabs>
          </Grid>
          <Grid item xs={12}>
            {value === 0 && <TabGuest user={this.props.thisUser} />}
            {value === 1 && <TabHost user={this.props.thisUser}  />}
            {value === 2 && <TabTalent user={this.props.thisUser}  />}
          </Grid>
        </Grid>
      )
    } 
  }


export default PageProfile = withTracker(() => {
  const handle = Meteor.subscribe('currentUser');
  const loading = !handle.ready();
  const thisUser = Meteor.users.findOne(Meteor.userId());

  return {
    handle,
    loading,
    thisUser
  };
})(PageProfileComponent);