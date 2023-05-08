import React, { Component } from "react";
import './App.css'
import './nprogress.css'
import CitySearch from "./CitySearch";
import EventList from "./EventList";
import NumberOfEvents from './NumberOfEvents'
import { extractLocations, getEvents, getAccessToken, checkToken, isLoggedIn } from './api';
import { WarningAlert } from "./alert";
import WelcomeScreen from "./WelcomeScreen";

class App extends Component {
  state = {
    events: [],
    locations: [],
    eventCount: 32,
    currentLocations: 'all',
    selectedCity: null,
    warningText: '',
    showWelcomeScreen: undefined
  }

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isValidToken = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    if ((code || isValidToken) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({
            events,
            locations: extractLocations(events)
          });
        }
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateNoe(number) {
    this.setState({
      numberOfEvents: number
    })
  }

  promptOfflineWarning = () => {
    if (!navigator.onLine) {
      this.setState({
        warningText: 'App is offline, and may not be up to date!'
      })
    }
  }

  updateEvents = (location, eventCount) => {
    if (!eventCount) {
      getEvents().then((events) => {
        const locationsEvents =
          location === 'all'
            ? events
            : events.filter((event) => event.location === location);
        const showEvents = locationsEvents.slice(0, this.state.eventCount);
        this.setState({
          events: showEvents,
          selectedCity: location
        });
      });
    } else if (this.state.selectedCity === 'all') {
      getEvents().then((events) => {
        const locationEvents = events;
        const showEvents = locationEvents.slice(0, eventCount);
        this.setState({
          events: showEvents,
          eventCount: eventCount
        });
      });
    } else {
      getEvents().then((events) => {
        const locationEvents =
          this.state.locations === 'all'
            ? events
            : events.filter((event) => this.state.selectedCity === event.location);
        const showEvents = locationEvents.slice(0, eventCount);
        this.setState({
          events: showEvents,
          eventCount: eventCount
        })
      })
    }
  };

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length
      const city = location.split(', ').shift()
      return { city, number };
    })
    return data;
  }

  render() {
    const offlineMessage = navigator.onLine
      ? ''
      : 'You are currently offline. The list of events may not be up to date!'
    if (isLoggedIn()) {
      return (
        <div className='App'>

          <WarningAlert text={offlineMessage} />
          <h1>Welcome to shyMeets App</h1>
          <CitySearch
            locations={this.state.locations}
            updateEvents={this.updateEvents}
          />
          <EventList
            events={this.state.events}
          />
          <NumberOfEvents
            selectedCity={this.state.selectedCity}
            query={this.state.eventCount}
            updateEvents={this.updateEvents}
          />
        </div>
      );
    } else {
      return (
        <div className='App'>

          <WelcomeScreen
            getAccessToken={getAccessToken}
          />
        </div>
      );
    }
  }
}

export default App;