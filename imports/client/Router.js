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
import BecomeHost from './forms/BecomeHost';
import BecomeTalent from './forms/BecomeTalent';
import PageEventMap from './PageEventMap';
import NomadicoDetails from './events/Nomadico';
import ZarahnaDetails from './events/Zarahna'

// import PageEventMap from './pageEventMap/PageEventMap';
// import PageSignUp from './PageSignUp';
// import EventForm from './EventForm2';
import PageTest from './old-test/PageTest'
// import { LoginFormContainer } from './accounts/ui/components/LoginForm'
// import TestLogin from './TestLogin';


class Router extends Component {
    render() {
        return (
        <Switch>
            <Route exact path='/' component={PageHome} />
            <Route path='/howitworks' component={HowItWorks} />
            <Route path='/landing' component={PageLanding2} />
            <Route path='/about' component={PageAboutPAKKE} />
            <Route path='/events' component={PageEventMap} />            
            <Route path='/event/:id' component={EventDetails} />
            <Route path='/profile' component={PageProfile} />
            <Route path='/host' component={BecomeHost} />
            <Route path='/talent' component={BecomeTalent} />
            <Route path='/terms' component={PageTerms} />
            
            { Meteor.isDevelopment ? (
                <>
                <Route path='/test' component={PageTest} />
                <Route path='/admin' component={Accounts.ui.LoginForm} />
                <Route path='/adminz' component={AdminPanel} />
                </>
            ) : ('')
            }
            <Route component={PageError} />

            {/* <Route path='/login' component={PageLogin} /> */}
            {/* <Route path='/signup' comFponent={PageSignUp} /> */}

        </Switch>
)
}};

export default Router;