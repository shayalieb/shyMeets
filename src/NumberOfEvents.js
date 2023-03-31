import React, { Component } from 'react';

class NumberOfEvents extends Component {
    constructor() {
        super();
        this.state = {
            query: 32
        };
    }

    handleNoe = (event) => {
        const value = event.target.value;
        if (value >= 1 || value <= 32) {
            this.setState({
                query: value
            });
            this.props.updateEvents(this.props.selectedCity, value)
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
                >
                </input>
            </div>
        )
    }
}

export default NumberOfEvents;
