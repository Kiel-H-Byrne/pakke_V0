import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import Blaze from 'meteor/gadicc:blaze-react-component';

const AccountsUIWrapper2 = () => (
  <div className='sign-in'>
    <Blaze template="loginButtons" align="right"/>
  </div>
);


export default AccountsUIWrapper2;