import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Accounts } from 'meteor/std:accounts-bootstrap';

import Home from './Home';
import PageAbout from './PageAbout';
import Event from './Event';
import EventDetail from './EventDetail';
import PageProfile from './PageProfile';
import PageLogin from './PageLogin';
import PageSignUp from './PageSignUp';
import PageError from './PageError';
import BecomeHost from './BecomeHost';
import EventForm from './EventForm2';
// import { LoginFormContainer } from './accounts/ui/components/LoginForm'

const Router = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/about' component={PageAbout} />
            <Route path='/event/:id' component={EventDetail} />
            <Route path='/profile' component={PageProfile} />
            <Route path='/login' component={PageLogin} />
            <Route path='/test' component={ EventForm } />
            <Route path='/signup' component={PageSignUp} />
            <Route path='/host' component={BecomeHost} />
            <Route component={PageError} />

        </Switch>
    </main>
)

export default Router;