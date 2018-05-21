import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PageError extends Component {
  render() {

    const styles = {
      container : {
        background: 'black',
        color: 'white'
      },
      frame: {
        position: 'relative',
        margin: 'auto',
      }

    };

    return (
      <div className="container-fluid text-center" style={styles.container} >
        <h1>I Can't Find That Page...</h1>
        <div className="container-fluid">
          <iframe className="giphy-embed" src="https://giphy.com/embed/9J7tdYltWyXIY?html5=true" width="100%" height="480" frameBorder="0" allowFullScreen="" style={styles.frame}></iframe>
        </div>
        <p className="lead"><em>Try <Link to="/events" >searching for some local events</Link> instead...</em></p>
      </div>
            )
  }
};

export default PageError;