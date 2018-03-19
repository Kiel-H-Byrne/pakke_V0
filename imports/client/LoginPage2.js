import React, { Component } from 'react'
import { withHistory, Link } from 'react-router-dom'
import { Accounts } from 'meteor/std:accounts-ui';


// export default class LoginPage2 extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             error: ''
//         };
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     handleSubmit(e) {
//         e.preventDefault();
//         let email = document.getElementById('login-email').value;
//         let password = document.getElementById('login-password').value;
//         Meteor.loginWithPassword(email, password, (err) => {
//             if (err) {
//                 Bert.alert(err.reason, "danger", "growl-top-right")
//                 this.setState({
//                     error: err.reason
//                 });
//             } else {
//                 Bert.alert("You are now logged in", "success")
//                 this.props.history.push('/');
//             }
//         });
//     }

//     render() {
        
//         return (

//                 <Accounts.ui.LoginForm />

//         );
//     }
// }

if (Meteor.isClient) {
  // ReactDOM.render(<Accounts.ui.LoginForm />, document.body)
}