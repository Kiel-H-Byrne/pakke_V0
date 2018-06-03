import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import AutoFields from 'uniforms-bootstrap3/AutoFields';
import AutoForm from 'uniforms-bootstrap3/AutoForm';
import SubmitField from 'uniforms-bootstrap3/SubmitField';
import TextField from 'uniforms-bootstrap3/TextField';
import ErrorsField from 'uniforms-bootstrap3/ErrorsField';
import { BarLoader } from 'react-spinners';
import Redirect from 'react-router';
import Events from '../startup/collections/events';
import Event from './Event';
import TabGuest from './TabGuest';
import TabHost from './TabHost';
import TabTalent from './TabTalent';
import LandingPage2 from './UI/PageLanding2';

class PageProfile extends Component {
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
              color='#226199' 
              width={-1}
              height={10}
            />
        </div>
      )
    }
    // console.log(this);
    const model = this.props.thisUser.profile;

    const omitFields = ["talents.$.talentId", "venue.$.venueId"];

      return (
        <div>

          <div className='profile-head'>
            <div className='profile-head-image'>
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
              <button className='btn btn-info btn-sm center-block' type="button" data-toggle="modal" data-target="#profileModal">Edit Profile</button>
              <div className="modal fade" id="profileModal" role="dialog">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button type="button" className="close" data-dismiss="modal">&times;</button>
                      <h4 className="modal-title">Edit Profile</h4>
                    </div>
                    <div className="modal-body">
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
              <TabGuest />
            </div>
            <div id="menu1" className="tab-pane fade">
              <TabHost />
            </div>
            <div id="menu2" className="tab-pane fade">
              <TabTalent />
            </div>
          </div>
        </div>
      )
    } 
  }


export default withTracker(() => {
  const handle = Meteor.subscribe('currentUser');
  const loading = !handle.ready();
  const thisUser = Meteor.user();

  return {
    handle,
    loading,
    thisUser
  };
})(PageProfile);