import React, { Component } from "react";
import './App.css'
import CitySearch from "./CitySearch";
import EventList from "./EventList";
import NumberOfEvents from './NumberOfEvents'

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 15
  }
  render() {
    return (
      <div className='App'>
        <CitySearch />
        <EventList />
        <NumberOfEvents />
      </div>
    )
  }
}

export default App;