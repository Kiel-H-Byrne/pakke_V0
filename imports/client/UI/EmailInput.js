import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit,
    },
    input: {
        margin: theme.spacing.unit,
        // color: 'white',
        background: 'white',
        paddingLeft: theme.spacing.unit,
        
    },
});

function InputWithIcon(props) {
    const { classes } = props;

    return (
        <Input
            placeholder="Enter Your Email"
            className={classes.input}
            inputProps={{
                'aria-label': 'Description',
            }}
        />
    );
}

InputWithIcon.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputWithIcon);