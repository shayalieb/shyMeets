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
    numberOfEvents: 32,
    currentLocations: 'all',
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
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
    const { currentLocations, numberOfEvents } = this.state;
    if (location) {
      getEvents().then((response) => {
        const locationEvents =
          location === 'all'
            ? response.events
            : response.events.filter((event) => event.location === location);
        const events = locationEvents.slice(0, numberOfEvents);
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
          numberOfEvents: eventCount,
          locations: response.locations
        });
      });
    }
  };


  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length
      const city = location.split(' ,').shift()
      return { city, number }
    })
    return data
  }



  render() {
    const { numberOfEvents, locations, events } = this.state;
    return (
      <div className='App'>
        <CitySearch
          locations={locations}
          updateEvents={this.updateEvents}
        />
        <EventList
          events={events}
        />
        <NumberOfEvents
          numberOfEvents={numberOfEvents}
          updateEvents={this.updateEvents}
        />
      </div>
    )
  }
}

export default App;