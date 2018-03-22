import React, { Component } from 'react';
import '../../client/sass/PageTest'

class PageTest extends Component {
  render() { 
    const letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

    return (
            <div className="testWrapper">
              {letters.map((item, i) => {
                return (
                        <div key={i} className="testLetter">{item}</div>
                        )
              })}
            </div>
            )
  }
};

export default PageTest