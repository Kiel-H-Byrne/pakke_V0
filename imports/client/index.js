import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import {StripeProvider} from 'react-stripe-elements';

import App from './App';
import '../../lib/fixtures';

targetListing = function(map,pos) {
    map.instance.setCenter(pos);
    map.instance.setZoom(12);
};

Meteor.startup(() => {
  //=====  GoogleMaps load =====  
  GoogleMaps.load({
    v: '3',
    key: Meteor.settings.public.keys.googleAPI.key,
    libraries: ['places', 'geometry']
  });

render(
  (<BrowserRouter>
    <StripeProvider apiKey={ Meteor.settings.public.keys.stripe.key }>
      <App />
    </StripeProvider>
  </BrowserRouter>),
  document.getElementById('render-target'));
 });
