import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withTracker, createContainer } from 'meteor/react-meteor-data';
import Events from '../startup/collections/events';

class EventDetail extends Component {

  state = {
    event: {},
  }

  componentDidMount() {
    const allEvents = this.props.allEvents;
    const eventId = this.props.match.params.id;
    for (let i = 0; i < allEvents.length; i++) {
      if (allEvents[i]._id === eventId) {
        console.log(allEvents[i])
        this.setState({
          event: allEvents[i]
        });
      }
    }
  }

  attendEvent() {
    console.log('submit attendee')
    const eventId = this.state.event._id;
    const thisUserId = Meteor.userId();
    Meteor.call("attendEvent", thisUserId, eventId);

    Bert.alert("Your are attending this event", "success", "growl-top-right");
  }

  //   render() {
  //     console.log(this.state.event.image)
  //     return (
  //       <div>
  //         <img className='event-detail-image' src={this.state.event.image} alt='image'/>
  //         <h1>{this.state.event.byline}</h1>        
  //         <p>{this.state.event.description}</p>

  //         <button onClick={this.attendEvent.bind(this)} className="btn btn-lg btn-success">Attend Event</button>

  //         <div className="modal fade" id="loginModal" role="dialog">
  //           <div className="modal-dialog">
  //             <div className="modal-content">
  //               <div className="modal-header">
  //                 <button type="button" className="close" data-dismiss="modal">&times;</button>
  //                 <h4 className="modal-title">Log In</h4>
  //               </div>
  //               <div className="modal-body">

  //               </div>
  //             </div>

  //           </div>
  //         </div>
  //       </div>
  //     )
  //   }
  // }

  render() {
    return (
      <div>
        <img className='event-detail-image' src={this.state.event.image} alt='image' />
        {this.props.thisUserId}
        <h1>{this.state.event.byline}</h1>
        <p>{this.state.event.description}</p>

        <div className='event-detail-bottom'>

          <div className='host-info'>
            <img className='host-image' src='/missing_profile.png' />
            <h3>Host Name</h3>
          </div>


          <div className='attend-event-button-area'>
            {this.props.thisUserId ? (
              <div className='attend-event-button'><button onClick={this.attendEvent.bind(this)} className="btn btn-lg btn-success">Attend Event</button></div>
            ) : (
                <div className='attend-event-button'>
                  <button type="button" className="btn btn-success btn-lg" data-toggle="modal" data-target="#loginModal">Attend Event</button>
                  <div className="modal fade" id="loginModal" role="dialog">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <button type="button" className="close" data-dismiss="modal">&times;</button>
                          <h4 className="modal-title">Log In</h4>
                        </div>
                        <div className="modal-body">

                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              )}
          </div>
        </div>

      </div>
    )
  }
}

export default withTracker(() => {
  let eventsSub = Meteor.subscribe('events_current');
  return {
    allEvents: Events.find({}).fetch(),
    thisUser: Meteor.user(),
    thisUserId: Meteor.userId(),
  }
})(EventDetail);

