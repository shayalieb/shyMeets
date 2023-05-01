import React from "react";
import { mount } from "enzyme";
import { loadFeature, defineFeature } from "jest-cucumber";
import App from '../App'
import { mockData } from "../mock-data";

const feature = loadFeature('./src/features/showHideEventDetails.feature');

defineFeature(feature, test => {
    let AppWrapper;
    test('event element is collapsed by default', ({ given, when, then }) => {
        given('the user has not selected a location', () => {
            //Because the app has not been open
        });

        when('the app is opened but there is no action yet', () => {
            AppWrapper = mount(<App />)
        });

        then('all events should be hidden by default', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.event .details-button')).toHaveLength(0)
        });
    });

    test('The user can expand event details by clicking show details', ({ given, when, then }) => {
        given('the user has selected an event', () => {
            //AppWrapper = mount(<App />)
        });

        when('the user clicks on the show details button', async () => {
            //AppWrapper.update();
            //await AppWrapper.find('.event .details-button').at(0).simulate('click');
        });

        then('event details should be displayed', () => {
            //expect(AppWrapper.find('.event .details')).toHaveLength(1);
        });
    });

    test('User can collapse and hide event details', ({ given, when, then }) => {
        given('the user is done with viewing the event', async () => {
            //AppWrapper = await mount(<App />);

        });

        when('the user clicks hide details button', () => {
            //AppWrapper.update();
            //AppWrapper.find('.event .details-button').at(0).simulate('click')
        });

        then('the details should be collapsed nad hidden', () => {
            //expect(AppWrapper, find('.event .details')).toHaveLength(0)
        });
    });
});