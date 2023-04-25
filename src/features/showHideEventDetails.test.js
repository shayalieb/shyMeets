import React from "react";
import { loadFeature, defineFeature } from "jest-cucumber";
import { mount, shallow } from "enzyme";
import App from "../App";
import CitySearch from "../CitySearch";
import { mockData } from "../mock-data";
import { extractLocations } from "../api";

const feature = loadFeature('./src/features/showHideEventDetails.feature');

defineFeature(feature, test => {
    let AppWrapper;
    test('an event element is collapsed by default', ({ given, when, then }) => {
        given('has not selected a city', () => {
            //this remain empty as there has been no action yet
        });

        when('the user opens the app with no interaction yet ', () => {
            AppWrapper = mount(<App />)
        });

        then('all events are shown but details collapsed', () => {
            AppWrapper.update()
            expect(AppWrapper.find('event .expanded')).toHaveLength(0)
        });
    });

    test('User can expand an event to its see details', ({ when, then, given }) => {
        given('the user selects an event', () => {
            AppWrapper = mount(<App />)
        })

        when('the user clicks the see more details button', () => {
            AppWrapper.update()
            AppWrapper.find('.event .details-button').at(0).simulate('click');
        });

        then('the event details will expand', () => {
            expect(AppWrapper.find('.event .details')).toHaveLength(1)
        });
    });

    test('User can collapse an event and hide its details', ({ given, when, then }) => {
        given('the user has seen the details', async () => {
            AppWrapper = await mount(<App />)
            AppWrapper.update();
            AppWrapper.find('.event .details-button');
        });

        when('the user clicks the hide details button', () => {
            AppWrapper.update();
            AppWrapper.find('.event .details-button').at(0).simulate('click');
        });

        then('the details page will collapse and be hidden', () => {
            expect(AppWrapper.find('.event .details')).toHaveLength(0)
        });
    });
});