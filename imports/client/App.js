import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';


// import Header from './header/Header';
// import Header2 from './UI/Header2';
import Header3 from './UI/Header3';

import Router from './Router';
import muiTheme from './UI/muiTheme';


class App extends Component {
  render() {
    return (
      <div>
        <Header3 />
        <Router />
      </div>

    )
  }
}

export default App;

