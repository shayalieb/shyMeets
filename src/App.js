import React, { Component } from "react";
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen'
import { getEvents, checkToken, getToken } from './api';
import './App.css';
import './nprogress.css';

class App extends Component {
  state = {
    events: [],
    currentLocations: 'all',
    offlineText: '',
    numberOfevents: 32,
    locations: [],
    tokenCheck: false,
    page: null,
  };

  async componentDidMount() {
    const accessToken = localStorage.getItem('access_token');
    const validToken = accessToken !== null ? await checkToken(accessToken) : false;
    this.setState({
      tokenCheck: validToken
    });

    if (validToken === true) this.updateEvents()

    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');

    this.mounted = true;
    if (code && this.mounted === true && validToken === false) {
      this.setState({
        tokenCheck: true
      })
      this.updateEvents();
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length;
      const city = location.split(' ').shift();
      return { city, number };
    });
    return data;
  }

  updateEvents = (location, eventCount) => {
    console.log('Update events valid token:', this.state.tokenCheck);
    const { currentLocations, numberOfevents } = this.setState;
    if (location) {
      getEvents().then((response) => {
        const locationEvents =
          location === 'all'
            ? response.events
            : response.events.filter((event) => event.location === location);
        const events = locationEvents.slice(0, numberOfevents);
        return this.setState({
          events: events,
          currentLocations: location,
          locations: response.locations
        });
      });
    } else {
      getEvents().then((response) => {
        const locationEvents =
          currentLocations === 'all'
            ? response.events
            : response.events.filter((event) => event.location === currentLocations);
        const events = locationEvents.slice(0, eventCount);
        return this.setState({
          events: events,
          numberOfevents: eventCount,
          locations: response.locations
        });
      });
    }
  };

  render() {
    const { locations, numberOfevents, events, tokenCheck } = this.state;
    return checkToken = false ? (
      <div className="App">
        <WelcomeScreen />
      </div>
    ) : (
      <div className="App">
        <h1>shyMeets App</h1>
        <h4>Choose you nearest city</h4>
        <CitySearch
          updateEvents={this.updateEvents}
          locations={locations}
        />
        <NumberOfEvents
          updateEvents={this.updateEvents}
          numberOfevents={numberOfevents}
        />
        <EventList
          events={events}
        />
      </div>
    );
  }
}

export default App;