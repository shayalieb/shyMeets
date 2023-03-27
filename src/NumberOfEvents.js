import React, { Component } from 'react';

class NumberOfEvents extends Component {
    state = {
        noe: 15
    }

    componentDidMount() {
        this.setState({ noe: this.props.noe || 15 });
    }

    changeNoe(value) {
        this.setState({ noe: value });
    }

    render() {
        const { noe } = this.state
        return (
            <div className='NumberOfEvents'>
                <h3>Show Number of Events</h3>
                <input
                    className='noe-input'
                    type='number'
                    value={noe}
                    onChange={event => {
                        this.changeNoe(event.target.value);
                    }}
                >
                </input>
            </div>
        )
    }
}

export default NumberOfEvents;