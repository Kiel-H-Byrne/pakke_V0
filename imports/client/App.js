import React, { Component} from 'react';

import Header from './header/Header';
import Router from './Router';

class App extends Component {
  render() {
  return (
    <div>
      <Header />
      <div className='main-content'>
        <Router />
      </div>
    </div>
  )
  }
}
export default App
