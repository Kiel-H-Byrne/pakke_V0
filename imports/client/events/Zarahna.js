import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
// import { withTracker } from 'meteor/react-meteor-data';
import { BarLoader } from 'react-spinners';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


class ZarahnaDetails extends Component {
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
          <img src="https://s3.us-east-2.amazonaws.com/pakke-images/events/IMG_LOZ2018.jpeg" style={{ width: '100%' }} />
       </Grid>
       <Grid item xs={12}>
        <Paper align={'center'} style={{ width: '80%', margin: '2% auto'}}>
         <Typography gutterBottom variant="display3">Micro Wellness Retreat in the Land of Zarahna</Typography>
         <Typography gutterBottom variant="display1"><address>Land of Zarahna</address> </Typography>
         <Typography gutterBottom variant="body2">
         <p><em>If you love health, wellness and a little adventure, check out the PAKKE/Owluma Micro Wellness Retreat in the otherworldly Land of Zarahna on Saturday, July 21-22. We will pick you up in DC on Saturday at 1:30pm, and whisk you away for 24 hours to our tree-secluded retreat cove for a beautiful sunset on the Potomac and the following experiences:</em></p>
         <ul>
           <li>Three delicious vegan meals</li>
           <li>Thai Yoga Massage Workshop</li>
           <li>Morning Glow Yoga</li>
           <li>Ecstatic Dance Workshop with beats by DJ Shango</li>
           <li>Bonfire</li>
           <li>Swimming and kayaking</li>
         </ul>
         </Typography>
          <Button href="https://nomadicofestival.com/tickets/" target="_blank">Get Tickets</Button>
       </Paper>
      </Grid>

      </Grid>
    )
  }
};

export default ZarahnaDetails ;


