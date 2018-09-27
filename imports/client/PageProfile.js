import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withStyles } from '@material-ui/core/styles';
import { BarLoader } from 'react-spinners';
import Redirect from 'react-router';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Modal from '@material-ui/core/Modal';

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


const styles = theme => ({
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
  },
  paper: {
    position: 'absolute',
    // width: theme.spacing.unit * 50,
    width: '60%',
    minWidth: 360,
    maxWidth: '85vh',
    maxHeight: '90vh',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 1,
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%)`,
  },  
});

class PageProfileComponent extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleEmail = this.handleEmail.bind(this)
    this.changeEmail = this.changeEmail.bind(this)
    this.state = {
      value: 0,
      preferredEmail: '',
      open: false,
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log(nextProps, prevState)
    let eventHost;
    nextProps.event ? eventHost = Meteor.users.findOne(nextProps.event.hostId) : {}
    return {
      // user: Meteor.user(),
      eventHost: eventHost
    };
  }
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  componentWillUnmount() {
    this.props.handle.stop();
  }

  handleSubmit(doc) {
    Meteor.call('editProfile', doc)
  }
  
  handleChange(event,value) {
    this.setState({value})
  }
  handleEmail(event) {
    this.setState({preferredEmail: event.target.value});
  }

  changeEmail(event) {
  //   show a modal with form to ask for new email address. 
  //   on submit, call method to 'updateEmailAddress' (server only method to Accounts.addEmail(userId, newEmail, [verified])), then when the email is clicked and verified, the callback should remove the old address so that emails[0] is always verified and used for communication:

  let rgxtest = new RegExp('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$');
  rgxtest.test(this.state.preferredEmail) ? Meteor.call('changeEmail', this.state.preferredEmail) : Bert.alert("Invalid Address", "danger", "growl-top-right");

  }

  handleClick = (e) => {
    let x = document.getElementById("profileForm");
    if (x.style.display === "none") {
        x.style.display = "block";
        x.style.opacity = 1;
    } else {
        x.style.display = "none";
        x.style.opacity = 0;
    }

  }
  
  handleSuccess = () => {
    Bert.alert("Your Profile Was Updated!", "success");
    this.handleClick();
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    // const { theme } = this.props;

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

    // let talentModel = Schema.Talent.clean({})
    // let interestsModel = Schema.Interests.clean({})
    // let venueModel = Schema.Venue.clean({})
    const thisProfile = this.props.thisUser.profile;

    const model = Schema.Profile.clean(thisProfile)
    // const model = Schema.User.clean(Meteor.user())

    return (
      <Grid container
      direction="column"
      justify="center"
      style={{margin:"1rem 0"}}>
        <Grid item xs={12} container spacing={24} alignItems="center" justify="space-evenly">
          <Grid item>
            <Card className={classes.card}>
              {thisProfile.avatar ? (
                <CardMedia className={classes.avatar} image={thisProfile.avatar} > 
                  <EditAvatarButton />
                </CardMedia>
              ) : (
                <CardMedia className={classes.avatar} image='/missing_profile.png' > 
                  <EditAvatarButton />
                </CardMedia>
              )}
              <CardContent className='profile-head-text'>
                {(thisProfile.name) ? (
                  <Typography variant="subheading" align="center">I'm {thisProfile.name}!</Typography>
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
                <Button onClick={this.handleClick} size="small" variant="contained">Edit Profile</Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item >
            <Paper id="profileForm" role="dialog" className={classes.profileForm}>
              <Typography variant="title">Profile</Typography>
              <AutoForm
              schema={Schema.Profile}
              model={model}
              onSubmit={this.handleSubmit}
              onSubmitSuccess={this.handleSuccess}
              onSubmitFailure={this.handleFailure} 
              className="tinyForm"
              >
                <AutoField name="name" />
                <Input value={Meteor.user().emails[0] ? Meteor.user().emails[0].address : ''} type="email" disabled/><Button onClick={this.handleOpen}>Change E-mail</Button>
                <Modal 
                aria-labelledby="Change Email Form"
                aria-describedby="Change your e-mail address."
                open={this.state.open}
                onClose={this.handleClose} 
                >
                  <div className={classes.paper}>
                    <Typography variant="display1" align="center" id="AddEventModal-title">Change & Verify Your Email Address:</Typography>
                    <Input fullWidth type="email" label="Preferred Email Address" onChange={this.handleEmail}></Input>
                    <Button type="submit" onClick={this.changeEmail} size="small">Change E-mail</Button>
                  </div>
                </Modal>
                <AutoField name="birthDate" />
                <AutoField name="social" />
                <InputLabel>Describe Yourself!</InputLabel>
                <TinyInput name="bio" content = {model.bio} />
                <SubmitField value="Submit" style={{position: 'relative', right: 0}} />
                <ErrorsField />
              </AutoForm>
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Tabs value={value} onChange={this.handleChange} fullWidth centered indicatorColor="secondary" textColor="secondary" style={{backgroundColor: '#fafafa'}} >
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
})(withStyles(styles)(PageProfileComponent));