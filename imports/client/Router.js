import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Accounts } from 'meteor/std:accounts-bootstrap';

import PageHome from './PageHome';
import PageAbout from './PageAbout';
import Event from './Event';
import EventDetail from './EventDetail';
import PageProfile from './PageProfile';
import PageLogin from './PageLogin';
import PageSignUp from './PageSignUp';
import PageError from './PageError';
import BecomeHost from './BecomeHost';
import BecomeTalent from './BecomeTalent';


import EventForm from './EventForm2';
import PageTest from './PageTest';
// import { LoginFormContainer } from './accounts/ui/components/LoginForm'

class Router extends Component {
    render() {
        return (
    <main>
        <Switch>
            <Route exact path='/' component={PageHome} />
            <Route path='/about' component={PageAbout} />
            <Route path='/event/:id' component={EventDetail} />
            <Route path='/profile' component={PageProfile} />
            <Route path='/login' component={PageLogin} />
            <Route path='/signup' component={PageSignUp} />
            <Route path='/host' component={BecomeHost} />
            <Route path='/talent' component={BecomeTalent} />
            <Route path='/test' component={ PageTest } />
            <Route component={PageError} />

        </Switch>
    </main>
)
}};

export default Router;