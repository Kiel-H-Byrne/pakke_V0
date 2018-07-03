import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import AutoFields from 'uniforms-material/AutoFields';
import AutoForm from 'uniforms-material/AutoForm';
import SubmitField from 'uniforms-material/SubmitField';
import TextField from 'uniforms-material/TextField';
import ErrorsField from 'uniforms-material/ErrorsField';
import Button from '@material-ui/core/Button';

import { BarLoader } from 'react-spinners';
import Redirect from 'react-router';
import Events from '../startup/collections/events';
import Event from './Event';
import TabGuest from './TabGuest';
import TabHost from './TabHost';
import TabTalent from './TabTalent';
import LandingPage2 from './UI/PageLanding2';
import PageError from './PageError';

import EditAvatarButton from './header/EditAvatarButton'

const styles = {
  profileForm: {
    display: 'none',
    width:'100vw',
    transition: 'visibility 0s, opacity 0.5s linear'
  }
}
class PageProfileComponent extends Component {
  state = {}

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
    const model = this.props.thisUser.profile;

    const omitFields = ["talentId", "venue.$.venueId"];

      return (
        <div>

          <div className='profile-head'>
            <div className='profile-head-image'>
              {/*
              <EditAvatarButton />
              */}
              {this.props.thisUser.profile.avatar ? (
                <img data-toggle="dropdown" className="icon avatar dropdown-toggle" src={this.props.thisUser.profile.avatar} />
              ) : (
                  <img data-toggle="dropdown" className="icon avatar dropdown-toggle" src='/missing_profile.png' />
                )}

            </div>
            <div className='profile-head-text'>
              {(this.props.thisUser.profile.name) ? (
                <h4>I'm {this.props.thisUser.profile.name}</h4>
              ) : (
                  <h4> I'm a new user </h4>
                )
              }
              <Button onClick={this.handleClick} >Edit Profile</Button>
              <div id="profileForm" role="dialog" style={styles.profileForm}>
                <h4 >Edit Profile</h4>
                <AutoForm
                  schema={Schema.Profile}
                  model={model}
                  onSubmit={this.handleSubmit}
                  onSubmitSuccess={this.handleSuccess}
                  onSubmitFailure={this.handleFailure} >

                  <AutoFields />
                  <SubmitField value="Submit" />
                  <ErrorsField />
                </AutoForm>
              </div>
            </div>
          </div>

          <ul className="nav nav-tabs">
            <li className="active"><a data-toggle="tab" href="#home">Guest</a></li>
            <li><a data-toggle="tab" href="#menu1">Host</a></li>
            <li><a data-toggle="tab" href="#menu2">Talent</a></li>
          </ul>

          <div className="tab-content">
            <div id="home" className="tab-pane fade in active">
              <TabGuest user={this.props.thisUser} />
            </div>
            <div id="menu1" className="tab-pane fade">
              <TabHost user={this.props.thisUser}  />
            </div>
            <div id="menu2" className="tab-pane fade">
              <TabTalent user={this.props.thisUser}  />
            </div>
          </div>
        </div>
      )
    } 
  }


export default PageProfile = withTracker(() => {
  const handle = Meteor.subscribe('currentUser');
  const loading = !handle.ready();
  const thisUser = Meteor.user();

  return {
    handle,
    loading,
    thisUser
  };
})(PageProfileComponent);