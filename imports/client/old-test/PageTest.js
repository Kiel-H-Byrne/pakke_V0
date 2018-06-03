import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import FileUpload from '../forms/FileUpload';
// import UserFiles from '../../startup/collections/files';

class PageTest extends Component {
  render() {

    return (
    
    <FileUpload />
    
    )
  }
};
    
export default PageTest;
