import React, { Component } from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<Event /> component', () => {
    let EventWrapper, event;
    beforeAll(() => {
        event = mockData[0];
        EventWrapper = shallow(<Event event={event} />);
    });

    test('<Event /> check the summery h2 is rendered', () => {
        expect(EventWrapper).toBeDefined();
    });

    test('<Event /> check event summery is rendered', () => {
        const summary = EventWrapper.find('h2.summary');
        const summaryString = event.summary;
        expect(summary).toBeDefined();
        expect(summary.text()).toBe(summaryString);
    });

    test('<Event /> start time is rendered', () => {
        const startTime = EventWrapper.find('p.start');
        const dateString = event.start.date;
        expect(startTime).toBeDefined();
        expect(startTime.text()).toBe(dateString);
    });

    test('<Event /> location is rendered', () => {
        const eventLocation = EventWrapper.find('p.location');
        const locationString = event.location;
        expect(eventLocation).toBeDefined();
        expect(eventLocation.text()).toBe(`location: ${locationString}`);
    });

    test('<Event /> render show details button collapsed', () => {
        const detailsButton = EventWrapper.find('button.details-button');
        expect(EventWrapper.state('collapsed')).toBe(true);
        expect(detailsButton).toBeDefined();
        expect(detailsButton.text()).toBe('show Event Details');
        expect(EventWrapper.find('h3.about')).toHaveLength(0);
        expect(EventWrapper.find('p.description')).toHaveLength(0);
    });

    test('<Event /> render show details is expanded ', () => {
        const detailsButton = EventWrapper.find('button.details-button');
        detailsButton.simulate('click');
        expect(EventWrapper.find('h3.about')).toHaveLength(1);
        expect(EventWrapper.find('a.link')).toHaveLength(1);
        expect(EventWrapper.find('p.description')).toHaveLength(1);
        expect(EventWrapper.state('collapsed')).toBe(false)
    });
});