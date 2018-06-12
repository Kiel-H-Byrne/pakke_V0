import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input, { InputLabel, InputAdornment } from '@material-ui/core/Input';
import TextField from 'material-ui/TextField';
// import TextField from 'uniforms-material/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import AccountCircle from '@material-ui/icons/AccountCircle';

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit,
    },
    input: {
        margin: theme.spacing.unit,
        padding: theme.spacing.unit,
        fontSize: theme.spacing.unit * 2,
    },
    button: {
        fontSize: '16px !important',
        margin: ''
    },
});

function InputWithIcon(props) {

    handleSubmit = (event) => {
      event.preventDefault();
      const value = this.input.value;
      const emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      const emailArr = value.split('@');
      let crmParams = {};
      if (emailValid) {
        crmParams = {
          "Last Name": emailArr[0],
          "Email" : value,
          "Lead Source": "HomePage Form"
        };
        Bert.alert("Thank you! You can also Sign in with Facebook or Google.", "success");
        Meteor.call('crmInsert', 'leads', crmParams);
     } else {
        Bert.alert("Invalid E-mail Address", "danger");
      };
    }

    const { classes } = props;

    return (
        <form onSubmit = {handleSubmit}>
            <input
                placeholder="Enter Your Email"
                className={classes.input}
                ref={(input) => this.input = input}
                aria-label= 'EMail'
            />
            <Button 
              variant='raised' 
              color="secondary" 
              style={styles.button} 
              size='large'
              type='submit'
              className={classes.input}
            >Join Us</Button>
      </form>
    );
}

InputWithIcon.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputWithIcon);