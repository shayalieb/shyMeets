import React, { Component } from 'react';
import { InfoAlert } from './alert';

class CitySearch extends Component {
    state = {
        locations: '',
        query: '',
        suggestions: [],
        showSuggestions: true,
        infoText: ''
    }
    // constructor() {
    //     super()
    //     this.state = {
    //         locations: '',
    //         query: '',
    //         suggestions: [],
    //         showSuggestions: undefined,
    //         infoText: ''
    //     }
    // }
    handleInputChanged = (event) => {
        const value = event.target.value;
        this.setState({
            showSuggestions: true
        });
        const suggestions = this.props.locations.filter((location) => {
            return location.toUpperCase().indexOf(value.toUpperCase()) > -1
        });
        if (suggestions.length === 0) {
            this.setState({
                query: value,
                suggestions,
                infoText: 'Cannot find the city you are looking for, please try again with correct spelling'
            })
        } else {
            return this.setState({
                query: value,
                suggestions,
                //infoText: ''
            });
        }
    }

    handleItemClicked = (suggestion) => {
        this.setState({
            query: suggestion,
            showSuggestions: false,
            infoText: ''
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