import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
    let NoeWrapper, noeInput;
    beforeAll(() => {
        NoeWrapper = shallow(<NumberOfEvents />);
        noeInput = NoeWrapper.find('input.noe-input');
    });

    test('render NumberOfEvents and noe-input', () => {
        expect(NoeWrapper).toBeDefined();
        expect(noeInput).toBeDefined();
    });

    test('noe-default number is 15', () => {
        expect(NoeWrapper.find('input.noe-input').prop('type')).toBe('number');
        expect(NoeWrapper.state('noe')).toBe(15);
    });

    test('when noe changes, the value should reflect correctly', () => {
        expect(NoeWrapper.state('noe')).toBe(15)
        NoeWrapper.find('input.noe-input').simulate('change', {
            target: { value: 20 }
        });
        expect(NoeWrapper.state('noe')).toBe(20)
    });
});