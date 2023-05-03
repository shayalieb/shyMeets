import React, { Component } from 'react';
import { ErrorAlert } from './alert';

class NumberOfEvents extends Component {
    constructor() {
        super();
        this.state = {
            query: 32,
            errorText: ''
        };
    }

    handleNoe = (event) => {
        const value = event.target.value;
        if (value >= 1 || value <= 32) {
            this.setState({
                query: value,
                errorText: '',
            });
            this.props.updateEvents(this.props.selectedCity, value)
        } if (value < 1 || value > 32) {
            return this.setState({
                query: value,
                errorText: 'Please select a number from 1 to 32 only'
            })
        }
    };

    render() {
        return (
            <div className='NumberOfEvents'>
                <h3>Show Number of Events</h3>
                <input
                    id='number-of-events'
                    className='noe-input'
                    min={1}
                    max={32}
                    type='number'
                    value={this.state.query}
                    onChange={this.handleNoe}
                />
                <ErrorAlert className='errorName' text={this.state.errorText} />
            </div>
        )
    }
}

export default NumberOfEvents;
