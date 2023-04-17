import React from "react";
import { shallow, mount } from "enzyme";
import App from '../App';
import EventList from "../EventList";
import CitySearch from "../CitySearch";
import NumberOfEvents from "../NumberOfEvents";
import { mockData } from "../mock-data";
import { extractLocations, getEvents } from "../api";

//unit testing
describe('<App /> component', () => {
    let AppWrapper;
    beforeAll(() => {
        AppWrapper = shallow(<App />)
    })
    test('render a list of events', () => {
        expect(AppWrapper.find(EventList)).toHaveLength(1);
    });

    test('render the CitySearch component', () => {
        expect(AppWrapper.find(CitySearch)).toHaveLength(1);
    })

    test('render NumberOfEvents', () => {
        expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1)
    })
});

//integration testing
describe('<App /> integration', () => {
    test('App passes the events state as a prop to event list', () => {
        const AppWrapper = mount(<App />);
        const AppEventsState = AppWrapper.state('events');
        expect(AppEventsState).not.toEqual(undefined);
        expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
        AppWrapper.unmount();
    });
    test('App passes locations state as a prop to CitySearch', () => {
        const AppWrapper = mount(<App />);
        const AppLocationsState = AppWrapper.state('locations');
        expect(AppLocationsState).not.toEqual(undefined);
        expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
        AppWrapper.unmount();
    });
    test('get a list of events that match the city that the user selected', async () => {
        const AppWrapper = mount(<App />);
        const CitySearchWrapper = AppWrapper.find(CitySearch);
        const locations = extractLocations(mockData);
        CitySearchWrapper.setState({ suggestions: locations });
        const suggestions = CitySearchWrapper.state('suggestions');
        const selectedIndex = Math.floor(Math.random() * (suggestions.length));
        const selectedCity = suggestions[selectedIndex];
        await CitySearchWrapper.instance().handleItemClicked(selectedCity);
        const allEvents = await getEvents();
        const eventsToShow = allEvents.filter(event => event.location === selectedCity);
        expect(AppWrapper.state('events')).toEqual(eventsToShow);
        AppWrapper.unmount();
    });
    // test('get list of all events when user selects "See all cities"', async () => {
    //     const AppWrapper = mount(<App />);
    //     const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
    //     await suggestionItems.at(suggestionItems.length - 1).simulate('click');
    //     const allEvents = await getEvents();
    //     AppWrapper.setState({events: []})
    //     console.log(AppWrapper.state('events').length, 'events')
    //     expect(AppWrapper.state('events')).toEqual([]);
    //     AppWrapper.unmount();
    //   });
    test('events state changes number of events', () => {
        const AppWrapper = mount(<App />);
        const eventCount = AppWrapper.state('eventCount');
        expect(eventCount).toEqual(AppWrapper.find(NumberOfEvents).props().query);
        AppWrapper.unmount();
    })
    test('get a list of events that match the number that was input by the user', async () => {
        const AppWrapper = mount(<App />);
        const NoeWrapper = AppWrapper.find(NumberOfEvents);
        const selectedNumber = 32;
        const event = { target: { value: selectedNumber }};
        await NoeWrapper.instance().handleNoe(event);
        expect(AppWrapper.state("eventCount")).toEqual(selectedNumber);
    })
});