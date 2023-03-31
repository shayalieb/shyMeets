import React, { Component } from 'react';

class NumberOfEvents extends Component {
    state = {
        noe: 32,
        errorMessage: ''
    }

    // componentDidMount() {
    //     this.setState({ noe: this.props.noe || 15 });
    // }

    changeNoe = (event) => {
        const value = event.target.value;
        this.props.updateEvents(null, value);
        this.setState({
            noe: value
        })
        if (value < 1 || value > 32) {
            this.setState({
                infoText: 'Select a number from 1 - 32'
            });
        } else {
            this.setState({
                infoText: ''
            });
        }
    };

    render() {
        const { noe } = this.state;
        return (
            <div className='NumberOfEvents'>
                <h3>Show Number of Events</h3>
                <input
                    id='number-of-events'
                    className='noe-input'
                    type='number'
                    value={noe}
                    onChange={this.changeNoe}
                    min='0'
                >
                </input>
            </div>
        )
    }
}

export default NumberOfEvents;
