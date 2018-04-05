import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import PageHome from './PageHome';
import PageAbout from './PageAbout';
import Event from './Event';
import EventList from './EventList';
import EventDetail from './EventDetail';
import PageProfile from './PageProfile';
import PageError from './PageError';
import BecomeHost from './forms/BecomeHost';
import BecomeTalent from './forms/BecomeTalent';
import PageEventMap from './PageEventMap';
import PostForm from './FormBecomeHost';

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
    <main>
        <Switch>
            <Route exact path='/' component={PageHome} />
            <Route path='/about' component={PageAbout} />
            <Route path='/events' component={PageEventMap} />            
            <Route path='/event/:id' component={EventDetail} />
            <Route path='/profile' component={PageProfile} />
            <Route path='/host' component={BecomeHost} />
            <Route path='/talent' component={BecomeTalent} />
            <Route component={PageError} />
            
            {/* <Route path='/login' component={PageLogin} /> */}
            {/* <Route path='/signup' component={PageSignUp} /> */}
            <Route path='/test' component={ PostForm } />
            

        </Switch>
    </main>
)
}};

export default Router;