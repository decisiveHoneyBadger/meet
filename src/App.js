import './nprogress.css';
import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { WarningAlert } from './Alert';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import WelcomeScreen from './WelcomeScreen';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    location: 'all',
    showWelcomeScreen: undefined,
  };

  updateNumberOfEvents = (numberOfEvents) => {
    console.log('updaing appjs state: ' + numberOfEvents);
    this.setState(
      {
        numberOfEvents,
      },
      this.updateEvents(this.state.location, numberOfEvents),
    );
  };

  // changes the state of events
  updateEvents = (location, eventCount) => {
    getEvents().then((events) => {
      /*
      if (eventCount !== undefined) {
        this.setState({
          numberOfEvents: this.state.numberOfEvents,
        });
      }*/
      const locationEvents =
        location === 'all'
          ? events
          : events.filter((event) => event.location === location);

      this.setState({
        events: locationEvents.slice(0, this.state.numberOfEvents),
        currentLocation: location,
      });
    });
  };

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    this.setState({
      showWelcomeScreen: !(code || isTokenValid),
    });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({
            events,
            locations: extractLocations(events),
          });
        }
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    if (this.state.showWelcomeScreen === undefined)
      return <div className="App" />;
    return (
      <div className="App">
        {!navigator.onLine && <WarningAlert text={'Offline data'} />}
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <NumberOfEvents updateEvents={this.updateNumberOfEvents} />
        <EventList events={this.state.events} />
        <WelcomeScreen
          showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => {
            getAccessToken();
          }}
        />
      </div>
    );
  }
}

export default App;
