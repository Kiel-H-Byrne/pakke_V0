import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';

import NaturePeople from '@material-ui/icons/NaturePeople';
import GroupWork from '@material-ui/icons/GroupWork';
import Palette from '@material-ui/icons/Palette';
import ConfirmationNumber from '@material-ui/icons/ConfirmationNumber';
import Extension from '@material-ui/icons/Extension';
import AllInclusive from '@material-ui/icons/AllInclusive';
import People from '@material-ui/icons/People';
// import  from '@material-ui/icons/';


function CoreValues(props) {

    const { theme } = props;
    //   const primaryText = theme.palette.text.primary;
    //   const primaryColor = theme.palette.primary.main;
    const colors = ["#E7B11C", "#511F9D", "#757CD6", "#E7111C", "#2964ff"];
    const styles = {
        wrapper: {
            flexGrow: 1,
            // background: theme.palette.secondary.main,
            // background: 'url(https://www.designbolts.com/wp-content/uploads/2013/02/Sandbag-Grey-Seamless-Pattern-For-Website-Background.jpg)',

            height: '100%',
        },
        paper: {
            // background: theme.palette.primary.light,
            // width: '100%',
        },
        box1: {
            // padding: `${theme.spacing.unit *1.5}px ${theme.spacing.unit * 2}px`,
            padding: "1rem",
        },
        box2: {
            padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
            marginBottom: '5%',
        },
        icon: {
            display: 'block',
            margin: 'auto',
            color: colors[Math.floor(Math.random()*colors.length)],
            fontSize: 50
        },
        divider: {
            // color: theme.palette.secondary.dark
            // border: 'blue',
            // background: 'blue',
            borderColor: theme.palette.secondary.light,
            width: '15%',
            // borderStyle: 'blue',
        }
    };

    return (
    <Grid id="CoreValues" container justify={'center'} style={styles.wrapper}>
        <Paper style={styles.paper}>
            <Typography variant='h4' align={'center'} style={styles.box1}>What We Value:
            </Typography>
            <Grid container justify={'center'} style={{ marginTop: '1%' }} direction='row'>

                <Grid item xs={12} sm={2}>
                    <GroupWork style={styles.icon}/>
                    <Typography align={'center'} style={styles.box1} variant="h5">
                    Foster Community</Typography>
                    <hr style={styles.divider} />
                    <Typography align={'center'} style={styles.box2} variant="subtitle1">
                    Interconnect members of the community, reinvest in the community, pool resources from the community.</Typography>
                </Grid>

                <Grid item xs={12} sm={2}>
                    <Palette style={styles.icon} />
                    <Typography align={'center'} style={styles.box1} variant="h5">
                    Champion for Creativity</Typography>
                    <hr style={styles.divider} />
                    <Typography align={'center'} style={styles.box2} variant='subtitle1'>
                    Champion for people and communities to express their creativity.</Typography>
                </Grid>

                <Grid item xs={12} sm={2}>
                    <AllInclusive style={styles.icon} />
                    <Typography align={'center'} style={styles.box1} variant="h5">
                    Diversity & Inclusion</Typography>
                    <hr style={styles.divider} />
                    <Typography align={'center'} style={styles.box2} variant='subtitle1'>
                    We strive to create inclusive, respectful, and safe spaces for everyone to showcase their true selves.</Typography>
                </Grid>

                <Grid item xs={12} sm={2}>
                    <NaturePeople style={styles.icon} />
                    <Typography align={'center'} style={styles.box1} variant="h5">
                    Stewards for the Planet</Typography>
                    <hr style={styles.divider} />
                    <Typography align={'center'} style={styles.box2} variant='subtitle1'>
                    Implementation of sustainable practices to preserve, protect, & promote the health of the planet.</Typography>
                </Grid>

                <Grid item xs={12} sm={2}>
                    <Extension style={styles.icon} />
                    <Typography align={'center'} style={styles.box1} variant="h5">
                    Member of the Community</Typography>
                    <hr style={styles.divider} />
                    <Typography align={'center'} style={styles.box2} variant='subtitle1'>
                    We want to learn & grow with the community by leveraging volunteered data and constantly matching our offerings to the needs & demands of the local community.</Typography>
                </Grid>
            </Grid>
        </Paper>
    </Grid>
    );
}

CoreValues.propTypes = {
    theme: PropTypes.object.isRequired,
};

export default withTheme()(CoreValues); // Let's get the theme as a property
