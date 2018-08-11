import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Editor } from '@tinymce/tinymce-react';
import { Link } from 'react-router-dom';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';

import AutoForm    from 'uniforms-material/AutoForm';
import AutoField  from 'uniforms-material/AutoField';
import DateField  from 'uniforms-material/DateField';
import SubmitField from 'uniforms-material/SubmitField';
import ErrorsField from 'uniforms-material/ErrorsField';
import HiddenField from 'uniforms-material/HiddenField'; 

import '../../startup/collections/schemas';
import eventCreatedAdminTemplate from '../email/eventCreatedAdminTemplate';
import FileUpload from './FileUpload.js';
import VenuesForm from './VenuesForm';
import TinyInput from './TinyInput.js'

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

class ControlledExpansionPanels extends React.Component {
  state = {
    expanded: null,
  };

  handleExpand = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;
    const model = Schema.Event.clean({});

    return (
      <AutoForm  
      schema={Schema.Event} 
      model={model} 
      onSubmit={this.handleSubmit} 
      onSubmitSuccess={this.handleSuccess} 
      onSubmitFailure={this.handleFailure} 
      className="tinyForm"
      id="addeventForm"
      className={classes.root} >
        <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleExpand('panel1')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>1. Locate It</Typography>
            <Typography className={classes.secondaryHeading}>Pick a place</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <VenuesForm form="addeventForm"/>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleExpand('panel2')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>2. Describe It</Typography>
            <Typography className={classes.secondaryHeading}>
              What is this all about?
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          <Grid direction="column">
              <Typography variant="display1" align="center">Step 2. - Describe It</Typography>
              <Typography variant="subheading" align="center">Let guests know what this experience is about!</Typography>
              <AutoField name="byline" />
              <InputLabel htmlFor="event-description" shrink={true}>Describe this experience...</InputLabel>
              <TinyInput name="description"/>
              <DateField name="date"  />
              <AutoField name="duration"  />
              <AutoField name="size" />
              <AutoField name="price" />
              <InputLabel>Upload a picture to use for the cover!</InputLabel>
              <FileUpload name="image" module="events"/>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleExpand('panel3')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>3. List It!</Typography>
            <Typography className={classes.secondaryHeading}>
              Let's make it!
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          <Grid direction="column">
            <AutoField name="isPrivate" />
            <AutoField name="contact" />
            
            {/* <MaskedInput 
                mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                name="contact"
                label="Contact Number"

            /> */}
            <AutoField name="checkedPolicy" />
            <Typography 
            component={Link}
            to="/terms"
            variant="caption"
            align="right"
            >Peruse the PAKKE Privacy Policy
            </Typography>
            <HiddenField name="hostId" /> 
            </Grid>               
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <SubmitField>Submit</SubmitField>
        <ErrorsField />        
      </AutoForm>
    );
  }
}

ControlledExpansionPanels.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlledExpansionPanels);