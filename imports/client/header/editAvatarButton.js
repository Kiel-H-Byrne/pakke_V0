import React, { Component } from 'react';

export class editAvatarButton extends Component {
  
  render() {
    return (
      <div>
        <Pencil onClick={this.handleClick}/>
      </div>
    );
  }
}
