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
        });

        then('the user should see the list of all events in all cities', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.event')).toHaveLength(mockData.length)
        });
    });

    test('User should see a list of suggested cities', ({ given, when, then }) => {
        given('the main page is opens', () => {
            CitySearchWrapper = shallow(<CitySearch updateEvents={() => {}}  locations={locations}/>)
        });

        when('the user starts typing in the search box', () => {
            CitySearchWrapper.find('.city').simulate('change', { target: { value: 'Miami, FL'}})

        });

        then('the user should receive a list of suggested cities', () => {
            expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(32)
        });
    });

    test('User can select a city from the suggestion list', ({ given, and, when, then }) => {
        let AppWrapper;
        given('the user was typing in Miami FL in the text box',  async () => {
            // AppWrapper = await mount(<App />)
            // AppWrapper.find('.city').simulate('change', { target: { value: 'Miami, FL'}})
        });

        and('the list of suggested cities is showing', () => {
            // AppWrapper.update();
            // expect(AppWrapper.find('.suggestions li')).toHaveLength(4)
        });

        when('the user selects a city from the list', () => {
            // AppWrapper.find('.suggestions li').at(0).simulate('click');
        });

        then('the city should change to the selected city', () => {
            // const CitySearchWrapper = AppWrapper.find(CitySearch);
            // expect(CitySearchWrapper.state('query')).toBe('Miami, FL');
        });

        and('the user should get a list of all events in that suggested city', () => {
            // expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
        });
    });
});