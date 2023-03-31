import React, { Component } from "react";
import './App.css'
import './nprogress.css'
import CitySearch from "./CitySearch";
import EventList from "./EventList";
import NumberOfEvents from './NumberOfEvents'
import { extractLocations, getEvents } from './api';

class App extends Component {
  state = {
    events: [],
    locations: [],
    eventCount: 32,
    currentLocations: 'all',
    selectedCity: null
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        const showEvents = events.slice(this.state.eventCount)
        this.setState({
          events: showEvents,
          locations: extractLocations(events)
        });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
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
    } else if (eventCount && !location) {
      getEvents().then((events) => {
        const locationEvents = events.filter((event) =>
          this.state.locations.includes(event.location)
        );
        const showEvents = locationEvents.slice(0, eventCount);
        this.setState({
          events: showEvents,
          eventCount: eventCount
        })
      })
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
    return (
      <div className='App'>
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
    )
  }
}

export default App;