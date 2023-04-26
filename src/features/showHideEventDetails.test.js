import React from "react";
import { loadFeature, defineFeature } from "jest-cucumber";
import { mount } from "enzyme";
import App from "../App";
import { mockData } from "../mock-data";
import Event from "../Event";

const feature = loadFeature('./src/features/showHideEventDetails.feature');

defineFeature(feature, test => {
    let AppWrapper;
    test('the user has not opened or interacted with the app yet', ({ given, when, then }) => {
        given('the user has not selected a city', () => {
            //this remain empty as there has been no action yet
        });

        when('the user opens the app with no interaction yet', () => {
            AppWrapper = mount(<App />)
            AppWrapper.state.events = mockData;
        });

        then('all events are shown but details collapsed', () => {
            AppWrapper.update();
            expect(AppWrapper.state.events).toHaveLength(mockData.length)

        });
    });

    test('the event details will expand', ({ when, then }) => {
        let AppWrapper
        when('the user clicks the see more details button', () => {
            AppWrapper = mount(<App />)
            //AppWrapper.state = mockData
        });

        then('the event details will expand', () => {
            AppWrapper.update()
            AppWrapper.find('.event .details-button').at(0).simulate('click')
            //expect(EventWrapper.state).toHaveLength(mockData.event)
        });
    });

    test('User can collapse an event and hide its details', ({ given, when, then }) => {
        given('the user has seen the details', () => {

        });

        when('the user clicks the hide details button', () => {

        });

        then('the details page will collapse and be hidden', () => {

        });
    });
});