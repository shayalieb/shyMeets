import React from "react";
import { shallow, mount } from "enzyme";
import CitySearch from "../CitySearch";
import { mockData } from "../mock-data";
import { extractLocations } from "../api";

describe('<CitySearch /> component', () => {
    let locations, CitySearchWrapper;
    beforeAll(() => {
        locations = extractLocations(mockData);
        CitySearchWrapper = shallow(<CitySearch locations={locations} updateEvents={() => { }} />)
    });

    test('render text input', () => {
        expect(CitySearchWrapper.find('.city')).toHaveLength(1);
    });

    test('render a list of suggestions', () => {
        expect(CitySearchWrapper.find('.suggestions')).toHaveLength(1);
    });

    test('render that text input is correct', () => {
        const query = CitySearchWrapper.state('query');
        expect(CitySearchWrapper.find('.city').prop('value')).toBe(query);
    });

    test('change the state when text input changes', () => {
        CitySearchWrapper.setState({
            query: 'Munich'
        });
        const eventObject = { target: { value: 'Brooklyn, NY' } };
        CitySearchWrapper.find('.city').simulate('change', eventObject);
        expect(CitySearchWrapper.state('query')).toBe('Brooklyn, NY');
    });

    test('correctly render a list of suggestions', () => {
        const locations = extractLocations(mockData);
        CitySearchWrapper.setState({ suggestions: locations });
        const suggestions = CitySearchWrapper.state('suggestions');
        expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(suggestions.length + 1);
        for (let i = 0; i < suggestions.length; i++) {
            expect(CitySearchWrapper.find('.suggestions li').at(i).text()).toBe(suggestions[i])
        }
    });

    test('suggestion list to match the query when changed', () => {
        CitySearchWrapper.setState({ query: '', suggestions: [] });
        CitySearchWrapper.find('.city').simulate('change', {
            target: { value: 'Brooklyn, NY' },
        });
        const query = CitySearchWrapper.state('query');
        const filteredLocations = locations.filter((location) => {
            return location.toUpperCase().indexOf(query.toUpperCase()) > -1;
        })
        expect(CitySearchWrapper.state('suggestions')).toStrictEqual(filteredLocations)
    });

    test('change the query state when selecting a suggestion', () => {
        CitySearchWrapper.setState({
            query: 'Brooklyn, NY'
        });
        const suggestions = CitySearchWrapper.state('suggestions');
        CitySearchWrapper.find('.suggestions li').at(0).simulate('click');
        expect(CitySearchWrapper.state('query')).toBe(suggestions[0]);
    });

    test('show the suggestion list when selecting CitySearch', () => {
        CitySearchWrapper.find('.city').simulate('focus');
        expect(CitySearchWrapper.state('showSuggestions')).toBe(true);
        expect(CitySearchWrapper.find('.suggestions').prop('style')).not.toEqual({ display: 'none' });
    });

    test('hide suggestion list when a suggestions is chosen', () => {
        CitySearchWrapper.setState({
            query: 'Brooklyn, NY',
            showSuggestions: undefined
        });
        CitySearchWrapper.find('.suggestions li').at(0).simulate('click');
        expect(CitySearchWrapper.state('showSuggestions')).toBe(false);
        expect(CitySearchWrapper.find('.suggestions').prop('style')).toEqual({ display: 'none' })
    });
});
