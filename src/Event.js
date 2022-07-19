import React, { Component } from 'react';
import { WarningAlert } from './Alert';

class Event extends Component {
  state = {
    collapsed: true,
    warningText: 'This event is going to be soon run out',
  };

  handleClick = () => {
    this.state.collapsed
      ? this.setState({ collapsed: false })
      : this.setState({ collapsed: true });
  };

  dateNewFormat = (eventDate) => {
    const newDate = `${new Date(eventDate)}`;
    return newDate;
  };

  changeBtnText = () => {
    if (this.state.collapsed === true) {
      return 'show details';
    } else {
      return 'hide details';
    }
  };

  render() {
    const { event } = this.props;
    return (
      <div className="event">
        <WarningAlert text={this.state.warningText} />
        <h3 className="title">{event.summary}</h3>
        <p className="start-time">{this.dateNewFormat(event.start.dateTime)}</p>
        <p className="location">{event.location}</p>
        {!this.state.collapsed && (
          <p className="event-details">{event.description}</p>
        )}
        <button className="btn-details" onClick={this.handleClick}>
          {this.changeBtnText()}
        </button>
      </div>
    );
  }
}
export default Event;
