import React, { Component } from 'react';
import {Helmet} from "react-helmet";
// import Header from './header/Header';
// import Header2 from './UI/Header2';
import Header from './UI/Header3';

import Router from './Router';
import muiTheme from './UI/muiTheme';


class App extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <meta property="og:determiner" content="auto" />
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="PAKKE" />
          <meta property="fb:app_id" content="168356840569104" />
        </Helmet>
        <Header />
        <Router />
      </div>
    )
  }
}

export default App;

