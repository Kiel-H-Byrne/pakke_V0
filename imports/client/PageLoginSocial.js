import React from 'react'
import ReactDOM from 'react-dom'
 
import SocialButton from './SocialButton'
 
const handleSocialLogin = (user) => {
  console.log(user)
}
 
const handleSocialLoginFailure = (err) => {
  console.error(err)
}

const app_id = Meteor.settings.public.keys.facebook.app_id;
 
ReactDOM.render(
  <div>
    <SocialButton
      provider='facebook'
      appId={app_id}
      onLoginSuccess={handleSocialLogin}
      onLoginFailure={handleSocialLoginFailure}
    >
      Login with Facebook
    </SocialButton>
  </div>,
  document.getElementById('testDiv')
)

