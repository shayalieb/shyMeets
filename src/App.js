import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './numberOfEvents';

class App extends Component {
  state = {
    events: [],
    locations: [],
    NumberOfEvents: 10
  }
  render() {
    return (
      <div className='App'>
        <EventList />
        <CitySearch />
        <NumberOfEvents />
      </div>
    );
  };
};

export default App;