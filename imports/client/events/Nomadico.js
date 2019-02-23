import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
// import { withTracker } from 'meteor/react-meteor-data';
import { BarLoader } from 'react-spinners';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
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
      <Grid container direction="column">
        <Grid item xs={12}>
          <a href="https://nomadicofestival.com/tickets/" target="_blank">
          <img src={'img/events/nomadico__cover.png'} style={{ width: '100%' }} /></a>
       </Grid>
       <Grid item xs={12}>
        <Paper align={'center'} style={{ width: '80%', margin: '2% auto'}}>
         <Typography gutterBottom variant="h2">Meso Creso's Nomadico Festival</Typography>
         <Typography gutterBottom variant="h4"><address> 980 Cove Rd, Gore, VA 22637</address> </Typography>
         <Typography gutterBottom variant=" body1"><em>A festival celebrating global music, arts, and community featuring 40 DJs, workshops, yoga and wellness. Boho camping nestled in Virginia's Appalachian Mountains with immersive experiences and interactive artworks.</em></Typography>
          <Button size="large" color={"#2964ff"} href="https://nomadicofestival.com/tickets/" target="_blank">Get Tickets</Button>
       </Paper>
      </Grid>

      </Grid>
    )
  }
};

export default NomadicoDetails ;


