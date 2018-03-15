import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Event extends Component {

  render() {
    return (

      <div className='event'>

        <Link to={`/event/${this.props.event._id}`}>
          <div>
            <span>{this.props.event.eventName}</span>
            <h3>{this.props.event.eventAddress}</h3>
          </div>
        </Link>

      </div>
    )
  }
}
