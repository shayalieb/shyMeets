// import React, { Component } from "react";
// //import { getEvents } from "./api";
// import { InfoAlert } from "./alert";

// class CitySearch extends Component {
//     constructor() {
//         super();
//         this.state = {    
//             locations: this.props.locations,
//             query: '',
//             suggestions: [],
//             showSuggestions: undefined,
//             infotext: ''
//         };
//     }
//     handleInputChanged = (event) => {
//         const value = event.target.value;
//         this.setState({
//             showSuggestions: true
//         });

//         const suggestions = this.props.locations.filter((location) => {
//             return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
//         });
//         if (suggestions.length === 0) {
//             this.setState({
//                 query: value,
//                 infotext: 'The city you are looking for was not found, please try again with correct spelling'
//             })
//         } else {
//             return this.setState({
//                 query: value,
//                 suggestions,
//                 infotext: ''
//             });
//         }
//     }

//     handleItemClicked = (suggestions) => {
//         this.setState({
//             query: suggestions,
//             showSuggestions: false,
//             infotext: ''
//         });
//         this.props.updateEvents(suggestions);
//     };

//     render() {
//         return (
//             <div className="CitySearch">
//                 <InfoAlert text={this.state.infotext} />
//                 <input
//                     type='text'
//                     className='city'
//                     value={this.state.query}
//                     onChange={this.handleInputChanged}
//                     onFocus={() => {
//                         this.setState({
//                             showSuggestions: true
//                         });
//                     }}
//                 />
//                 <ul
//                     className='suggestions'
//                     style={this.state.showSuggestions ? {} : { display: 'none' }}
//                 >
//                     {this.state.suggestions.map((suggestion) => (
//                         <li
//                             key={suggestion}
//                             onClick={() => this.handleItemClicked(suggestion)}
//                         >
//                             {suggestion}
//                         </li>
//                     ))}
//                     <li onClick={() => this.handleItemClicked('all')}>
//                         <b>See all cities</b>
//                     </li>
//                 </ul>
//             </div>
//         );
//     }
// }

// export default CitySearch;

import React, { Component } from 'react';
import { getEvents } from './api';
import { InfoAlert } from './alert';

class CitySearch extends Component {
    state = {
        //locations: this.props.locations,
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
            const suggestions = locations.filter((event) => {
                console.log(event, 'showMyError')
                return event.location.toUpperCase().indexOf(value.toUpperCase()) > -1;
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