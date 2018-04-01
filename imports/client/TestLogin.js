import React, { Component } from 'react'
 
import SocialButton from './SocialButton'
 
const handleSocialLogin = (user) => {
  console.log(user.profile)
  //check if email exists, if so merge and login
  // if not exist, create new user and login
}
 
const handleSocialLoginFailure = (err) => {
  console.error(err)
}

const app_id = Meteor.settings.public.keys.facebookOAuth.app_id;

class PageLoginSocial extends Component {
  render() {
    return (
        <SocialButton
          provider="facebook"
          appId={app_id}
          redirect="https://www.pakke.us/login"
          onLoginSuccess={handleSocialLogin}
          onLoginFailure={handleSocialLoginFailure}
        >
          Login with Facebook
        </SocialButton>
            )
  }
};

export default PageLoginSocial;