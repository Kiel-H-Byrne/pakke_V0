import React, { Component } from 'react';

class PageError extends Component {
  render() {

    const style = {
        position: 'absolute',
        top: '6em',
        width: '100%'
    };

    return (
      <div style={style} >
    <h4>I Can't Find That Page...</h4>
        <div >
          <iframe className="giphy-embed" src="https://giphy.com/embed/9J7tdYltWyXIY?html5=true" width="480" height="480" frameBorder="0" allowFullScreen="" ></iframe>
        </div>
      </div>
            )
  }
};

export default PageError;