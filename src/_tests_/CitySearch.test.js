import React from "react";
import { shallow } from "enzyme";
import CitySearch from "../CitySearch";
import { mockData } from '../mock-data';
import { extractLocations } from "../api";

describe('<CitySearch /> component', () => {
    let locations, CitySearchWrapper;
    beforeAll(() => {
        locations = extractLocations(mockData)
        CitySearchWrapper = shallow(<CitySearch locations={locations} updateEvents={() => {}}/>)
    })

    test('render the text input', () => {
        expect(CitySearchWrapper.find('.city')).toHaveLength(1)
    });

    test('render a list of suggestions', () => {
        expect(CitySearchWrapper.find('.suggestions')).toHaveLength(1);
    });

    test('render the text input correctly', () => {
        const query = CitySearchWrapper.state('query');
        expect(CitySearchWrapper.find('.city').prop('value')).toBe(query);
    });

    test('change the query state when text input changes', () => {
        CitySearchWrapper.setState({
            query: 'Brooklyn, NY'
        });
        const eventObject = { target: { value: 'Miami, FL' } };
        CitySearchWrapper.find('.city').simulate('change', eventObject);
        expect(CitySearchWrapper.state('query')).toBe('Miami, FL');
    });

    test('render a list of suggestions correctly', () => {
        const locations = extractLocations(mockData);
        CitySearchWrapper.setState({ suggestions: locations });
        const suggestions = CitySearchWrapper.state('suggestions');
        expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(suggestions.length + 1);
        for (let i = 0; i < suggestions.length; i += 1) {
            expect(CitySearchWrapper.find('.suggestions li').at(i).text()).toBe(suggestions[i]);
        }
    });

    test('suggestions list to match the query when changed', () => {
        CitySearchWrapper.setState({ query: '', suggestions: [] });
        CitySearchWrapper.find('.city').simulate('change', {
            target: { value: 'Miami, FL'},
        });
        const query = CitySearchWrapper.state('query');
        const filteredLocations = locations.filter((location) => {
            return location.toUpperCase().indexOf(query.toUpperCase()) > -1;
        });
        expect(CitySearchWrapper.state('suggestions')).toEqual(filteredLocations);
    });

    test('selecting a suggestion should change the query state', () => {
        CitySearchWrapper.setState({ query: 'Miami, FL' });
        const suggestions = CitySearchWrapper.state('suggestions');
        CitySearchWrapper.find('.suggestions li').at(0).simulate('click');
        expect(CitySearchWrapper.state('query')).toBe((suggestions[0]));
    });

    test('selecting a city input shows the suggestion list', () => {
        CitySearchWrapper.find('.city').simulate('focus');
        expect(CitySearchWrapper.state('showSuggestions')).toBe(true);
        expect(CitySearchWrapper.find('.suggestions').prop('style')).not.toEqual({ display: 'none'});
    })
});