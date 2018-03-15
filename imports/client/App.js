import React from 'react'
import Header from './Header'
import Router from './Router'

const App = () => (
  <div>
    <Header />
    <div className='main-content'>
      <Router />
    </div>
  </div>
)

export default App
