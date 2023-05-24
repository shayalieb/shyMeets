import React, { Component } from 'react';
import './Event.css'

class Event extends Component {
    state = { collapsed: true }
    toggleDetails = () => {
        this.setState((prevState) => ({
            collapsed: !prevState.collapsed,
        }));
    };

    render() {
        const { event } = this.props
        const { collapsed } = this.state;
        const { start } = event;
        const { dateTime, date, timeZone } = start;
        const eventDate = dateTime || date;

        return (
            <div className='event'>
                <h2 className='summary'>{event.summary}</h2>
                <p className='event-start'>
                    {new Date(eventDate).toString()}
                </p>
                <p className='event-location'>
                    {`Location: ${event.location || ''}`}
                </p>
                <button
                    className='details-button'
                    onClick={this.toggleDetails}
                >
                    {collapsed ? 'Show' : 'Hide'} Event Details
                </button>
                {!collapsed && (
                    <div className='details'>
                        <h3 className='about'>
                            About this Event
                        </h3>
                        <a
                            className='link'
                            href={event.htmlLink}
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            See event details on Google Calendar
                        </a>
                        <p
                            className='description'
                        >
                            {event.description}
                        </p>

                    </div>
                )}
            </div>
        )
    }
}

export default Event;
