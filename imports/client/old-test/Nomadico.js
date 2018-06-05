import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
// import { withTracker } from 'meteor/react-meteor-data';
import { BarLoader } from 'react-spinners';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


class NomadicoDetails extends Component {
  constructor(props) {
    
    super(props)
    this.state = {
      eventHost: {},
      soldOut: false
    }
  }

  render() {
    return (
      <div>
        
        <Paper align={'center'} style={{ width: 960, margin:'auto', marginTop: '2%' }}>
          <Typography gutterBottom variant="display4">Meso Creso's Nomadico Festival</Typography>
        </Paper>
        <a href="https://nomadicofestival.com/tickets/" target="_blank"><img src={'img/events/nomadico__cover.png'} /></a>
        <Paper align={'center'} style={{ width: 360, margin: '2% auto'}}>
       <Typography gutterBottom variant="display1"> 980 Cove Rd, Gore, VA 22637 </Typography>
       <Typography gutterBottom variant=" body1"><em>A festival celebrating global music, arts, and community featuring 40 DJs, workshops, yoga and wellness. Boho camping nestled in Virginia's Appalachian Mountains with immersive experiences and interactive artworks.</em></Typography>
        <Button size="large" color="secondary" href="https://nomadicofestival.com/tickets/" target="_blank">Get Tickets</Button>
       </Paper>
        
      </div>
    )
  }
};

export default NomadicoDetails ;


