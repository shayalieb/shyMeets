import React, { Component } from "react";
import './App.css'
import './nprogress.css'
import CitySearch from "./CitySearch";
import EventList from "./EventList";
import NumberOfEvents from './NumberOfEvents'
import { extractLocations, getEvents, checkToken, getAccessToken } from './api';
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
    // getEvents().then((events) => {
    //   if (this.mounted) {
    //     const showEvents = events.slice(this.state.eventCount)
    //     this.setState({
    //       events: showEvents,
    //       locations: extractLocations(events)
    //     });
    //   }
    // }).then(() => this.updateEvents('all'));
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  promptOfflineWarning = () => {
    if (!navigator.onLine) {
      this.setState({
        warningText: 'App is offline, and may not be up to date!'
      })
    }
  }

  updateNoe(number) {
    this.setState({
      numberOfEvents: number
    })
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

  render() {
    if (this.state.showWelcomeScreen === undefined)
      return (
        <div className='App'>
          <WarningAlert text={this.state.warningText} />
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
          <WelcomeScreen
            showWelcomeScreen={this.state.showWelcomeScreen}
            getAccessToken={() => { getAccessToken() }}
          />
        </div>
      );
  }
}

export default App;