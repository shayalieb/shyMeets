import React, { Component } from "react";
import "./App.css";
import CitySearch from "./CitySearch";
import EventList from "./EventList";
import NumberOfEvents from "./NumberOfEvents";
import WelcomeScreen from "./WelcomeScreen";
import EventGenre from "./EventGenre";
import { getEvents, extractLocations, getAccessToken, checkToken } from "./api";
import "./nprogress.css";
import { ErrorAlert, WarningAlert } from "./alert.js";
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';


class App extends Component {
  state = {
    events: [],
    //eventData: [],
    locations: [],
    eventCount: 32,
    selectedCity: null,
    errorText: '',
    showWelcomeScreen: undefined,
    data: [],
  };

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length
      //const city = location.split(', ').shift()
      //return { city, number };
      return { number };
    })
    return data;
  }

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem("access_token");
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    const authorized = code || isTokenValid;
    const isLocal = window.location.href.indexOf("localhost") > -1;
    this.setState({ showWelcomeScreen: !authorized && !isLocal });
    if ((authorized || isLocal) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({
            events: events,
            eventData: events,
            locations: extractLocations(events),
            data: this.getData(extractLocations(events), events),
          });
        }
      });
    }

    if (!navigator.onLine) {
      this.setState({
        errorText: "The app is offline, content is not up to date",
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location, eventCount) => {
    if (!eventCount) {
      getEvents().then((events) => {
        const locationEvents =
          location === "all"
            ? events
            : events.filter((event) => event.location === location);
        const shownEvents = locationEvents.slice(0, this.state.eventCount);
        this.setState({
          events: shownEvents,
          selectedCity: location,
        });
      });
    } else if (eventCount && !location) {
      getEvents().then((events) => {
        const locationEvents = events.filter((event) =>
          this.state.locations.includes(event.location)
        );
        const shownEvents = locationEvents.slice(0, eventCount);
        this.setState({
          events: shownEvents,
          eventCount: eventCount,
        });
      });
    } else if (this.state.selectedCity === "all") {
      getEvents().then((events) => {
        const locationEvents = events;
        const shownEvents = locationEvents.slice(0, eventCount);
        this.setState({
          events: shownEvents,
          eventCount: eventCount,
        });
      });
    } else {
      getEvents().then((events) => {
        const locationEvents =
          this.state.locations === "all"
            ? events
            : events.filter(
              (event) => this.state.selectedCity === event.location
            );
        const shownEvents = locationEvents.slice(0, eventCount);
        this.setState({
          events: shownEvents,
          eventCount: eventCount,
        });
      });
    }
  };

  render() {
    if (this.state.showWelcomeScreen === undefined)
      return <div className='App' />;
    return (
      <div className='App'>
        <h1>shyMeets App</h1>
        <ErrorAlert text={this.state.errorText} />
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <div className="data-vis-wrapper">
          <EventGenre events={this.state.events} />
          <ResponsiveContainer height={400}>
            <ScatterChart
              width={800}
              height={400}
              margin={{
                top: 20, right: 20, bottom: 20, left: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="category" dataKey="city" name="city" />
              <YAxis type="number" dataKey="number" name="number of events" allowDecimals={false} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="dataSet" data={this.getData()} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <EventList events={this.state.events} />
        <WelcomeScreen
          showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => {
            getAccessToken();
          }}
        />
        <NumberOfEvents
          eventCount={this.eventCount}
          updateEvents={this.updateEvents}
        />
        <WarningAlert text={this.state.errorText} />
      </div>
    );
  }
}

export default App;