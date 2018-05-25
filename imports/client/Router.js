import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import PageHome from './PageHome';
import PageAbout from './PageAbout';
import PageLanding2 from './UI/PageLanding2';
import HowItWorks from './UI/HowItWorks'


import Event from './Event';
import EventList from './EventList';
import EventDetails from './EventDetail';
import PageProfile from './PageProfile';
import PageError from './PageError';
import BecomeHost from './forms/BecomeHost';
import BecomeTalent from './forms/BecomeTalent';
import PageEventMap from './PageEventMap';

// import PageEventMap from './pageEventMap/PageEventMap';
// import PageSignUp from './PageSignUp';
// import EventForm from './EventForm2';
// import PageTest from './PageTest';
// import { LoginFormContainer } from './accounts/ui/components/LoginForm'
// import TestLogin from './TestLogin';
// import PageLogin from './PageLogin';



class Router extends Component {
    render() {
        return (
        <Switch>
            <Route exact path='/' component={PageHome} />
            <Route path='/howitworks' component={HowItWorks} />
            <Route path='/landing' component={PageLanding2} />
            <Route path='/about' component={PageAbout} />
            <Route path='/events' component={PageEventMap} />            
            <Route path='/event/:id' component={EventDetails} />
            <Route path='/profile' component={PageProfile} />
            <Route path='/host' component={BecomeHost} />
            <Route path='/talent' component={BecomeTalent} />
            <Route component={PageError} />

            {/* <Route path='/login' component={PageLogin} /> */}
            {/* <Route path='/signup' component={PageSignUp} /> */}

        </Switch>
)
}};

export default Router;