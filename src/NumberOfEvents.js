import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32,
  };

  handleInputChanged = (event) => {
    const inputNumberOfEvents = event.target.value;
    if (
      !isNaN(inputNumberOfEvents) &&
      inputNumberOfEvents >= 1 &&
      inputNumberOfEvents <= 32
    ) {
      this.setState({ numberOfEvents: inputNumberOfEvents, ErrorText: '' });
    } else {
      this.setState({ ErrorText: 'Please select a number from 1 to 32.' });
    }
    this.props.updateNumberOfEvents(inputNumberOfEvents);
  };

  render() {
    return (
      <div className="numberOfEvents">
        <label htmlFor="events-number">Number of Events: </label>
        <br />
        <input
          type="text"
          id="events-number"
          value={this.state.numberOfEvents}
          onChange={this.handleInputChanged}
        />
      </div>
    );
  }
}
export default NumberOfEvents;
