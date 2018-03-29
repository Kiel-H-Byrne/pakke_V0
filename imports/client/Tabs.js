import React, { Component } from 'react';

const tabData = [
  { name: 'Tab 1', isActive: true },
  { name: 'Tab 2', isActive: false },
  { name: 'Tab 3', isActive: false }
];

export class Tabs extends Component {
  render() {
    return (
      <ul className="nav nav-tabs">
        {tabData.map(function(tab){
          return (
            <Tab data={tab} isActive={this.props.activeTab === tab} handleClick={this.props.changeTab.bind(this,tab)} />
          );
        }.bind(this))}      
      </ul>
    );
  }
}