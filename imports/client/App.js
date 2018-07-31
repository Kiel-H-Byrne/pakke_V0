import React, { Component } from 'react';
import {Helmet} from "react-helmet";
// import Header from './header/Header';
// import Header2 from './UI/Header2';
import Header3 from './UI/Header3';

import Router from './Router';
import muiTheme from './UI/muiTheme';


class App extends Component {
  render() {
    return (
      <div>
      <Helmet>
        <meta property="og:title" content="PAKKE" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.pakke.us/img/brand/SOCIAL/Logo_Facebook_wordmark.jpg" />
        <meta property="og:image:secure_url" content="https://www.pakke.us/img/brand/SOCIAL/Logo_Facebook_wordmark.jpg" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="529" />
        <meta property="og:image:height" content="529" />
        <meta property="og:image:alt" content="P, Delta, K, K, E" />
        <meta property="og:url" content="https://www.pakke.us" />
        <meta property="og:description" content="Discover, Connect, Experience." />
        <meta property="og:determiner" content="auto" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="PAKKE" />
        <meta property="fb:app_id" content="168356840569104" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PAKKE" />
        <meta name="twitter:description" content="Discover, Connect, Experience." />
        <meta name="twitter:url" content="https://www.pakke.us" />
        <meta name="twitter:image" content="https://www.pakke.us/img/brand/PAKKE_LOGO_black.png" />
      </Helmet>
        <Header />
        <Router />
      </div>
    )
  }
}

export default App;

