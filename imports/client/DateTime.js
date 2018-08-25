import React from 'react';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import DateTimePicker from 'material-ui-pickers/DateTimePicker';

export default class DateTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date(),
    }
  }

  handleDateChange = date => {
    console.log(date)
    this.setState({ selectedDate: date });
  }

  render() {
    const { selectedDate } = this.state;
    return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DateTimePicker
          value={selectedDate}
          openTo="date"
          disablePast={true}
          onChange={this.handleDateChange}
        />
    </MuiPickersUtilsProvider>
    );
  }
}
