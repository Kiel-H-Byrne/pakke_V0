import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import analytics from '/lib/analytics/analytics.min.js';

import Typography from '@material-ui/core/Typography';


class PageError extends Component {
  render() {

    const styles = {
      container : {
        background: 'white',
        color: 'black',
        padding: '.25rem',
      },
      frame: {
        position: 'relative',
        margin: 'auto',
      }

    };
    analytics.page({
      name: "404Page"
    })
    
    return (
      
        <div className="container-fluid text-center" style={styles.container} >
          <div className="container-fluid" >
            <Typography variant="display2" align="center" gutterBottom={true}>I Can't Find That Page...</Typography>
            <iframe className="giphy-embed" src="https://giphy.com/embed/9J7tdYltWyXIY?html5=true" width="100%" height="480" frameBorder="0" allowFullScreen="" style={styles.frame}></iframe>
            <Typography variant="headline" align="center" paragraph={true} ><em>Try <Link to="/events" style={{color:"#FFC229"}}>searching for some local events</Link> instead...</em></Typography>
          </div>
          
        </div>

            )
  }
};

export default PageError;