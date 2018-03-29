import React, { Component } from 'react';
import Tabs from './Tabs';
import TabContent from './TabContent';

export class ProfileTabs extends Component {
  getInitialState() {
    return {
      activeTab: tabData[0]
    }
  }, 
  handleClick(tab) {
    this.setState({activeTab: tab});
  },
  render() {
    return (
      <div>
        <Tabs activeTab={this.state.activeTab} changeTab={this.handleClick} />
        <TabContent activeTab={this.state.activeTab} />
      </div>
    );
  }
};
