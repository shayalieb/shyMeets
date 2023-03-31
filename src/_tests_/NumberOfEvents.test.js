import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
    let NoeWrapper, noeInput;
    beforeAll(() => {
        NoeWrapper = shallow(<NumberOfEvents updateEvents={() => []} />);
        noeInput = NoeWrapper.find('input.noe-input');
    });

    test('render NumberOfEvents and noe-input', () => {
        expect(NoeWrapper).toBeDefined();
        expect(noeInput).toBeDefined();
    });

    test('noe-default number is 32', () => {
        expect(NoeWrapper.state('query')).toBe(32);
    });

    test('when noe changes, the value should reflect correctly', () => {
        NoeWrapper.find('input.noe-input').simulate('change', {
            target: { value: 15 },
        })
        expect(NoeWrapper.state('query')).toBe(15)
    });
});