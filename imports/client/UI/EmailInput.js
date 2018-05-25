import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input, { InputLabel, InputAdornment } from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
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
        background: 'white',
        padding: theme.spacing.unit,
        fontSize: theme.spacing.unit * 2,
    },
    button: {
        fontSize: 16,
        margin: ''
    },
});

function InputWithIcon(props) {

    handleSubmit = (event) => {
      event.preventDefault();
      let value = this.input.value;
      let emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      if (emailValid) {
        Bert.alert("Thank you! You can also Sign in with Facebook or Google.", "success");
        Meteor.call('crmInsert', 'leads', {"Email": value, "Description": "From Home Page Button. No Profile Yet"});
     } else {
        Bert.alert("Invalid E-mail Address", "danger");
      };
    }

    const { classes } = props;

    return (
        <form onSubmit = {handleSubmit}>
            <Input
                placeholder="Enter Your Email"
                className={classes.input}
                inputProps={{
                    'aria-label': 'EMail',
                }}
                inputRef={(input) => this.input = input}
            />
            <Button 
              variant='raised' 
              color="secondary" 
              style={styles.button} 
              size='large'
              type='submit'
            >Join Us</Button>
      </form>
    );
}

InputWithIcon.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputWithIcon);