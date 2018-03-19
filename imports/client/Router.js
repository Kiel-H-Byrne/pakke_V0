import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Accounts } from 'meteor/std:accounts-bootstrap';

import Home from './Home';
import About from './About';
import Event from './Event';
import EventDetail from './EventDetail';
import Profile from './Profile';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import BecomeHost from './BecomeHost';
import EventForm from './EventForm2';
// import { LoginFormContainer } from './accounts/ui/components/LoginForm'

const Router = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/about' component={About} />
            <Route path='/event/:id' component={EventDetail} />
            <Route path='/profile' component={Profile} />
            <Route path='/login' component={LoginPage} />
            <Route path='/test' component={ EventForm } />
            <Route path='/signup' component={SignUpPage} />
            <Route path='/host' component={BecomeHost} />

        </Switch>
    </main>
)

export default Router;