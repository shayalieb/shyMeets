import React, { Component } from 'react';
import { getEvents } from './api';
import { InfoAlert } from './alert';

class CitySearch extends Component {
    state = {
        locations: this.props.locations,
        query: '',
        suggestions: [],
        showSuggestions: undefined,
        infoText: ''
    }

    handleInputChanged = (event) => {
        const value = event.target.value;
        if (!value) {
            this.setState({ showSuggestions: false });
            return this.setState({
                query: value,
                infoText: '',
            });
        }
        this.setState({ showSuggestions: true });
        getEvents().then((events) => {
            let locations = events.map(e => e.location);
            const suggestions = locations.filter((location) => {
                return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
            });
            if (value && suggestions.length === 0) {
                this.setState({
                    query: value,
                    infoText: 'The city you are looking for is not found, Please try again with correct spelling'
                });
            } else {
                return this.setState({
                    query: value,
                    suggestions,
                    infoText: '',
                });
            }
        })
    };

    handleItemClicked = (suggestion) => {
        this.setState({
            query: suggestion,
            showSuggestions: false
        });
        this.props.updateEvents(suggestion)
    }

    render() {
        return (
            <div className='CitySearch'>
                <h3>Select a City</h3>
                <InfoAlert text={this.state.infoText} />
                <input
                    type='text'
                    className='city'
                    value={this.state.query}
                    onChange={this.handleInputChanged}
                    onFocus={() => { this.setState({ showSuggestions: true }) }}
                />
                <ul
                    className='suggestions'
                    style={this.state.showSuggestions ? {} : { display: 'none' }}
                >
                    {this.state.suggestions.map((suggestion) => (
                        <li
                            key={suggestion}
                            onClick={() => this.handleItemClicked(suggestion)}
                        >{suggestion}</li>
                    ))}
                    <li onClick={() => this.handleItemClicked('all')}>
                        <b>See all Cities</b>
                    </li>
                </ul>
            </div>
        );
    }
}

export default CitySearch;