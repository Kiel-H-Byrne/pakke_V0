import React from 'react';
import { withHistory, Link } from 'react-router-dom'
import { FacebookLogin } from 'react-facebook-login-component';

class FacebookButton extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    responseFacebook(response) {
        console.log(response);
        
    }

    render() {
        const app_id = Meteor.settings.public.keys.facebookOAuth.app_id;

        return (
            <div>
                <FacebookLogin socialId={app_id}
                    language="en_US"
                    scope="public_profile,email"
                    responseHandler={this.responseFacebook}
                    xfbml={true}
                    fields="id, email,first_name,last_name,name,picture"
                    version="v2.5"
                    className="facebook-login"
                    buttonText="Login With Facebook" />
            </div>
        );
    }

}

export default FacebookButton;