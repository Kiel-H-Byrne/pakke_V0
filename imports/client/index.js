import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import muiTheme from './UI/muiTheme';
import App from './App';
import '../../lib/fixtures';

targetListing = function (map, pos) {
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
      <MuiThemeProvider theme={muiTheme}>
        <App />
      </MuiThemeProvider >

    </BrowserRouter>),
    document.getElementById('render-target'));
});
