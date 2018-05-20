import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import Header from './header/Header';
import Header2 from './UI/Header2';

import Router from './Router';
import muiTheme from './UI/muiTheme';


class App extends Component {
  render() {
    return (
      <div>
        <Header2 />
        <Router />
      </div>

    )
  }
}
export default App
