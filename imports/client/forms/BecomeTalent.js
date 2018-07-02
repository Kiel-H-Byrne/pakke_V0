import React, { Component } from 'react'
import AddTalentModal from './AddTalentModal';
import { withTracker } from 'meteor/react-meteor-data';

class BecomeTalent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const loginAlert = () => Bert.alert("Please Log In First.", "info", "growl-top-right");
    return (
      <div className="container-host">
        <img src='Talent.jpg' />
        <div className='container-text-talent'>
          <h1>Share Your Talent</h1>
          <h2>Show us what you got</h2>
          <h3>Perform at new venues around the city and make extra cash.</h3>
          <p>Click the button below to register your tallent with PAKKE</p>
        </div>
        {this.props.authenticated ? (
          <div className='talent-button'>
            <AddTalentModal />
          </div>
        ) : (
            <div className='talent-button'>
              <Button onClick={loginAlert}>Register Your Talent</Button>
            </div>
          )
        }
      </div>
    );
  }
};

export default withTracker(() => {
  return {
    authenticated: Meteor.userId()
  }
})(BecomeTalent);