import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32,
  };

  handleInputChange = (event) => {
    //console.log(JSON.stringify(event));
    const number = event.target.value;
    console.log('Number: ' + number);
    if (number < 1 || number > 32) {
      this.setState({
        numberOfEvents: 32,
        errorText: 'Please select a number from 1 to 32',
      });
    } else {
      this.setState({
        numberOfEvents: number,
        errorText: '',
      });
      console.log('updaing appjs state: ' + number);
      this.props.updateEvents(null, number);
    }
  };
  render() {
    return (
      <div className="number-of-events">
        <br />
        <ErrorAlert text={this.state.errorText} />

        <label className="number-of-events__label">Number of events:</label>
        <br />
        <input
          type="number"
          className="number-of-events__input meet-input" // two classes are next to each other with a space
          value={this.state.numberOfEvents}
          onChange={(event) => this.handleInputChange(event)}
        />
      </div>
    );
  }
}
export default NumberOfEvents;
