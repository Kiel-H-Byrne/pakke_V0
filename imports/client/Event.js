import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Event extends Component {

  render() {
    return (

      <div className='eventCard'>

        <Link to={`/event/${this.props.event._id}`}>
          <div className="eventCard_bg">
            <span>{this.props.event.byline}</span>
            <h3>{this.props.event.eventAddress.city}</h3>
            <p>{this.props.event.description}</p>
          </div>
        </Link>

      </div>
    )
  }
}
