import React from 'react'
import { MapContainer } from './MapContainer';
import {GoogleApiWrapper} from 'google-maps-react';


class MyMap extends React.Component {
  render() {
    const style = {
      width: '100px',
      height: '100px'
    }
    return (
      <div className='map'>
        <MapContainer google={this.props.google}
        />
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBYt5iLvDaNNE5NC4u_BIAqe6f_PPhlV9Y'
})(MyMap)