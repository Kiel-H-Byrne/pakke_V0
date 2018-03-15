import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';

import App from './App';


Meteor.startup(() => {
render(
  (<BrowserRouter>
    <App />
  </BrowserRouter>),
  document.getElementById('render-target'));
 });