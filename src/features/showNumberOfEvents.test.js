import React from "react";
import { loadFeature, defineFeature } from "jest-cucumber";
import { mount } from "enzyme";
import App from '../App'
import { mockData } from "../mock-data";

const feature = loadFeature('./src/features/showNumberOfEvents.feature');

defineFeature(feature, test => {
    let AppWrapper
    test('When the user has not specified a number of events, the default should be 32', ({ given, when, then }) => {
        given('the user has not specified a number of events', () => {
            //This is empty as no action has been done by the user yet
        });

        when('selecting all events or specific city', () => {
            AppWrapper = mount(<App />)
            AppWrapper.state.events = mockData;
        });

        then('32 should be the default number of events', () => {
            expect(AppWrapper.state('eventCount')).toEqual(32)
        });
    });

    test('The user can change the number of events shown', ({ given, when, then }) => {
        given('the user does not want to view all events', async () => {
            AppWrapper = await mount(<App />)
        });

        when('the user changes the number of events in the input box', () => {
            AppWrapper.update();
            let NoeWrapper = AppWrapper.find('NumberOfEvents');
            const eventObject = { target: { value: 2 } };
            NoeWrapper.find('.noe-input').simulate('change', eventObject);
        });

        then('the user changes the number of events to its desired number', () => {
            expect(AppWrapper.state.events).toHaveLength(mockData.length)
        });
    });
})