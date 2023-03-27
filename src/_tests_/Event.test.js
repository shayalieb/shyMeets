import React from "react";
import { shallow } from "enzyme";
import Event from "../Event";
import { mockData } from "../mock-data";
import moment from "moment/moment";

describe('<Event /> component', () => {
    let EventWrapper, event;
    beforeAll(() => {
        event = mockData[0]
        EventWrapper = shallow(<Event event={event} />)
    });

    test('event is rendered', () => {
        expect(EventWrapper).toBeDefined();
    });

    test('event summary is rendered', () => {
        const summary = EventWrapper.find('h2.summary');
        const summaryString = event.summary;
        expect(summary).toBeDefined();
        expect(summary.text()).toBe(summaryString);
    });

    test('render event start', () => {
        const eventStart = EventWrapper.find('p.event-start');
        expect(eventStart).toHaveLength(1);
        expect(eventStart.text()).toBe(new Date(event.start.dateTime).toString());
    })

    test('render correct event location', () => {
        const eventLocation = EventWrapper.find('p.event-location');
        const locationString = event.location;
        expect(eventLocation).toBeDefined();
        expect(eventLocation.text()).toBe(`Location: ${locationString}`)
    })

    test('details button is collapsed', () => {
        const detailsButton = EventWrapper.find('button.details-button');
        expect(EventWrapper.state('collapsed')).toBe(true);
        expect(detailsButton).toBeDefined();
        expect(detailsButton.text()).toBe('Show Event Details');
        expect(EventWrapper.find('h3.about')).toHaveLength(0);
        expect(EventWrapper.find('a.link')).toHaveLength(0);
        expect(EventWrapper.find('p.description')).toHaveLength(0)
    });

    test('when details button is clicked it should expand with event details', () => {
        const detailsButton = EventWrapper.find('button.details-button');
        detailsButton.simulate('click');
        expect(EventWrapper.find('h3.about')).toHaveLength(1);
        expect(EventWrapper.find('a.link')).toHaveLength(1);
        expect(EventWrapper.find('p.description')).toHaveLength(1);
        expect(EventWrapper.state('collapsed')).toBe(false)
    });
});