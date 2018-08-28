import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Accounts, STATES } from 'meteor/std:accounts-ui';

import PageHome from './PageHome';
import PageAboutPAKKE from './PageAboutPAKKE';
import PageLanding2 from './UI/PageLanding2';
import HowItWorks from './UI/HowItWorks'
import AdminPanel from './admin/AdminPanel';
import Event from './Event';
import EventList from './EventList';
import EventDetails from './EventDetail';
import PageProfile from './PageProfile';
import PageError from './PageError';
import PageTerms from './PageTerms';
import PageEventMap from './PageEventMap';
import UserProfile from './UserProfile';
import UserEvents from './UserEvents';

import BecomeHost from './forms/BecomeHost';
import BecomeTalent from './forms/BecomeTalent';
import AddEventForm from './forms/AddEventForm.js'
import AddTalentForm from './forms/AddTalentForm.js'
import AddVenueForm from './forms/AddVenueForm.js'




// import PageEventMap from './pageEventMap/PageEventMap';
// import PageSignUp from './PageSignUp';
// import EventForm from './EventForm2';
import PageTest from './old-test/PageTest'
// import { LoginFormContainer } from './accounts/ui/components/LoginForm'
// import TestLogin from './TestLogin';


class Router extends Component {
    render() {
      return (
        <React.Fragment>
          <Switch>
              <Route exact path='/' component={PageHome} />
              <Route name="HowItWorks" path='/howitworks' component={HowItWorks} />
              <Route name="LandingPage" path='/landing' component={PageLanding2} />
              <Route name="AboutPAKKE" path='/about' component={PageAboutPAKKE} />
              <Route exact name="EventsMap" path='/events' component={PageEventMap} />            
              <Route name="UserEvents" path='/events/:userId' component={UserEvents} />
              <Route name="EventDetails" path='/event/:id' component={EventDetails} />
              <Route exact name="ProfilePage" path='/profile' component={PageProfile} />
              <Route name="UserProfile" path='/profile/:userId' component={UserProfile} />
              <Route name="BecomeHost" path='/host' component={BecomeHost} />
              <Route name="BecomeTalent" path='/talent' component={BecomeTalent} />
              <Route name="Terms" path='/terms' component={PageTerms} />
              <Route name="AddEvent" path='/addevent' component={AddEventForm} />
              <Route name="AddVenue" path='/addvenue' component={AddVenueForm} />
              <Route name="AddTalent" path='/addtalent' component={AddTalentForm} />

              <Route name="TestPage" path='/test17' component={PageTest} />
              <Route name="AdminPanel" path='/adminz' component={AdminPanel} />
              <Route name="404Page" component={PageError} />  
          </Switch>
        </React.Fragment>
  )
}};

export default Router;