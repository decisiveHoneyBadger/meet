import React, { Component } from 'react';

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
        errorText: 'Select a number from 1 to 32',
      });
    } else {
      this.setState({
        numberOfEvents: number,
        errorText: '',
      });
      console.log('updaing appjs state: ' + number);
      this.props.updateEvents(number);
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
