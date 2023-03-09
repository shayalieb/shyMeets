import React, { Component } from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<numberOfEvents />', () => {
    let NumberOfEventsWrapper, noeInput;
    beforeAll(() => {
        NumberOfEventsWrapper = shallow(<NumberOfEvents />);
        noeInput = NumberOfEventsWrapper.find('input.noe-input');
    });

    test('<numberOfEvents /> and noe-input are all rendered', () => {
        expect(NumberOfEventsWrapper).toBeDefined()
        expect(noeInput).toBeDefined();
    });

    test('noe-input shows default 10', () => {
        expect(NumberOfEventsWrapper.find('input.noe-input').prop('type')).toBe('number');
        expect(NumberOfEventsWrapper.state('noe')).toBe(10);
    });

    test('changing the noe-input value and render correctly', () => {
        expect(NumberOfEventsWrapper.state('noe')).toBe(10);
        NumberOfEventsWrapper.find('input.noe-input').simulate('change', {
            target: { value: 15 }
        });
        expect(NumberOfEventsWrapper.state('noe')).toBe(15)
    });

});