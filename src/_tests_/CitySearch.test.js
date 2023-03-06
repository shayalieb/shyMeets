import React from "react";
import { shallow } from "enzyme";
import CitySearch from "../CitySearch";
import { mockData } from "../mock-data";
import { extractLocations } from "../api";

describe('<CitySearch /> component', () => {
    test('render text input', () => {
        const CitySearchWrapper = shallow(<CitySearch />)
        expect(CitySearchWrapper.find('.city')).toHaveLength(1);
    });

    test('render a list of suggestions', () => {
        const CitySearchWrapper = shallow(<CitySearch />)
        expect(CitySearchWrapper.find('.suggestions')).toHaveLength(1);
    });

    test('renders text input correctly', () => {
        const CitySearchWrapper = shallow(<CitySearch />);
        const query = CitySearchWrapper.state('query');
        expect(CitySearchWrapper.find('.city').prop('value')).toBe(query);
    });

    test('change state when text input changes', () => {
        const CitySearchWrapper = shallow(<CitySearch />);
        CitySearchWrapper.setState({
            query: 'Miami'
        });
        const eventObject = { target: { value: 'New_York' } };
        CitySearchWrapper.find('.city').simulate('change', eventObject);
        expect(CitySearchWrapper.state('query')).toBe('New_York');
    });

    test('render list of suggestions correctly', () => {
        const locations = extractLocations(mockData);
        const CitySearchWrapper = shallow(<CitySearch />);
        CitySearchWrapper.setState({ suggestions: locations });
        const suggestions = CitySearchWrapper.state('suggestions');
        expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(suggestions.length + 1);
        for (let i = 0; i < suggestions.length; i += 1) {
            expect(CitySearchWrapper.find('.suggestions li').at(i).text()).toBe(suggestions[i]);
        }
    });
});
