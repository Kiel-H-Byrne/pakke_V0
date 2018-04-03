import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Event extends Component {

  render() {
    const dateArray = this.props.event.date.split('/');
    const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let monthNumber = Number(dateArray[0]);
    let date = dateArray[1];
    let month = monthArray[(monthNumber-1)];

    const style = {
      background: "url('img/holders/holder1.jpg') no-repeat "
    };


//turn into progressbar component w/ props: 
    let count = 0;
    if (this.props.event.guests) {
      count = this.props.event.guests.length;
    }
    let weight = ((count/this.props.event.size) * 100).toFixed();
    const style2 = {
      width: `${weight}%`
    };
    return (
      
      <div className='eventCard'>
            <Link to={`/event/${this.props.event._id}`}>
              <div className="eventCard_img" style={style}>
              <p>{month}<br />{date}</p>
              </div>
            </Link>
            <h3 className="eventCard_loc">{this.props.event.eventAddress.city}, {this.props.event.eventAddress.zip}</h3>
            <h2 className="eventCard_name">{this.props.event.byline}</h2>
            <p className="eventCard_desc">{this.props.event.description}</p>
            <div className="progress">
              <div className="progress-bar" role="progressbar" aria-valuenow={weight} aria-valuemin="0" aria-valuemax="100" style={style2}>
                {weight}%
              </div>
            </div>
      </div>
    )
  }
}
