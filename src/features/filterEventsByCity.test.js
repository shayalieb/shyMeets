//Acceptance testing
import React from "react";
import { loadFeature, defineFeature } from "jest-cucumber";
import { mount, shallow } from "enzyme";
import App from "../App";
import CitySearch from "../CitySearch";
import { mockData } from "../mock-data";
import { extractLocations } from "../api";

const feature = loadFeature('./src/features/filterEventsByCity.feature');

defineFeature(feature, test => {
    test('When the user has not searched for a city, show events in all cities', ({ given, when, then }) => {
        given('user has not searched for any city', () => {
            //The user has not searched for anything, this can stay empty
        });

        let AppWrapper;
        when('the user opens the App', () => {
            AppWrapper = mount(<App />);
            AppWrapper.state.events = mockData;
        });

        then('the user should see the list of all events in all cities', () => {
            AppWrapper.update();
            expect(AppWrapper.state.events).toHaveLength(mockData.length)
        });
    });

    test('User should see a list of suggested cities', ({ given, when, then }) => {
        let CitySearchWrapper;
        given('the main page is opens', () => {
            CitySearchWrapper = shallow(<CitySearch locations={extractLocations(mockData)} />)
        });

        when('the user starts typing in the search box', () => {
            CitySearchWrapper.find('.city').simulate('change', { target: { value: 'Miami, FL' } })

        });

        then('the user should receive a list of suggested cities', () => {
            expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(2)
        });
    });

    test('User can select a city from the suggestion list', ({ given, and, when, then }) => {
        let AppWrapper;
        given('the main page is opens', () => {
            AppWrapper = shallow(<CitySearch locations={extractLocations(mockData)} />)
        });

        when('the user was typing in Miami FL in the text box', () => {
            AppWrapper.find('.city').simulate('change', { target: { value: 'Miami, FL' } })

        });

        then('the list of suggested cities is showing', () => {
            expect(AppWrapper.find('.suggestions li')).toHaveLength(2)
        });
    });
});
