import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import Blaze from 'meteor/gadicc:blaze-react-component';

const AccountsUIWrapper2 = () => (
  <div className='sign-inS'>
    <Blaze template="loginButtons" alight={"right"}/>
  </div>
);


export default AccountsUIWrapper2;