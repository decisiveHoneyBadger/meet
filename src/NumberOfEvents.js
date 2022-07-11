import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32,
  };
  handleInputChange = (event) => {
    const number = event.target.value;
    if (number < 1 || number > 32) {
      this.setState({
        numberOfEvents: 32,
        errorText: 'Select a number from 1 to 32',
      });
    } else {
      this.setState({
        numberOfEvents: number,
        errorText: '',
      });
    }
  };
  render() {
    return (
      <div className="number-of-events">
        <label className="number-of-events__label">Number of events:</label>
        <input
          type="number"
          className="number-of-events__input"
          value={this.state.numberOfEvents}
          onChange={(event) => this.handleInputChange(event)}
        />
      </div>
    );
  }
}
export default NumberOfEvents;
