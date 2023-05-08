import React, { Component } from "react";
import './App.css'
import './nprogress.css'
import CitySearch from "./CitySearch";
import EventList from "./EventList";
import NumberOfEvents from './NumberOfEvents'
import { extractLocations, getEvents, getAccessToken, checkToken, isLoggedIn } from './api';
import { WarningAlert } from "./alert";
import WelcomeScreen from "./WelcomeScreen";

// class App extends Component {
//   state = {
//     events: [],
//     locations: [],
//     eventCount: 32,
//     numberOfEvents: 32,
//     selectedCity: 'all',
//     warningText: '',
//     showWelcomeScreen: undefined
//   };

//   async componentDidMount() {
//     this.mounted = true;
//     const accessToken = localStorage.getItem('access_token');
//     const isTokenValid = (await getAccessToken(accessToken)).error ? false : true;
//     const searchParams = new URLSearchParams(window.location.search);
//     const code = await searchParams.get('code');
//     this.setState({
//       showWelcomeScreen: !(code || isTokenValid)
//     });
//     if ((code || isTokenValid) && this.mounted) {
//       getEvents().then((events) => {
//         if (this.mounted) {
//           this.setState({
//             events: events,
//             locations: extractLocations(events)
//           });
//         }
//       });
//     }
//   }

//   componentWillUnmount() {
//     this.mounted = false;
//   };

//   promptOfflineWarning = () => {
//     if (!navigator.onLine) {
//       this.setState({
//         warningText: 'App is offline, and may not be up to date!'
//       })
//     }
//   }

//   updateEvents = (location, inputNumber) => {
//     const { eventCount, selectedCity } = this.setState;
//     if (location) {
//       getEvents().then((events) => {
//         const locationEvents = (location === 'all') ?
//           events :
//           events.filter((event) => event.location === location);
//         const eventsToShow = locationEvents.slice(0, eventCount);
//         this.setState({
//           events: eventsToShow,
//           selectedCity: location
//         });
//       });
//     } else {
//       getEvents().then((events) => {
//         const locationEvents = (selectedCity === 'all') ?
//           events :
//           events.filter((event) => event.location === selectedCity);
//         const eventsToShow = locationEvents.slice(0, inputNumber);
//         this.setState({
//           events: eventsToShow,
//           eventCount: inputNumber
//         });
//       });
//     }
//   }

//   getData = () => {
//     const { locations, events } = this.setState;
//     const data = locations.map((location) => {
//       const number = events.filter((event) => event.location === location).length
//       const city = location.split(', ').shift()
//       return { city, number };
//     })
//     return data;
//   }

//   render() {
//     const offlineText = navigator.onLine
//       ? ''
//       : 'The app is currently offline and may not be up to date';
//     if (this.state.showWelcomeScreen === undefined)
//       return <div className="App" />;
//     return (
//       <div className="App">
//         <h1 className="mb-4">Welcome to shyMeets App</h1>
//         <div
//         >
//           <WarningAlert text={this.state.offlineText} />
//         </div>
//         <CitySearch
//           locations={this.state.locations}
//           updateEvents={this.updateEvents}
//         />
//         <NumberOfEvents
//           numberOfEvents={this.state.numberOfEvents}
//           updateEvents={this.updateEvents}
//         />
//         <h3>Events in each city</h3>
//         <EventList events={this.state.events} />
//         <WelcomeScreen
//           showWelcomeScreen={this.state.showWelcomeScreen}
//           getAccessToken={() => {
//             getAccessToken();
//           }}
//         />
//       </div>
//     );
//   }
// }

// export default App;

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
    if (isLoggedIn()) {
      return (
        <div className='App'>

          <WarningAlert text={this.state.offlineText} />
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