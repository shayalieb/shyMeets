import React, { Component } from 'react';

class Event extends Component {
    state = { collapsed: true };
    toggleDetails = () => {
        this.setState(prevState => ({
            collapsed: !prevState.collapsed
        }))
    };

    render() {
        const { event } = this.props;
        const { collapsed } = this.state;

        return (
            <div className='event'>
                <h2 className='summary'>{event.summary}</h2>
                <p className='start'>
                    {event.start.date}
                </p>
                <p className='location'>
                    {`location: ${event.location}`}
                </p>
                <button className='details-button' onClick={this.toggleDetails}>
                    {collapsed ? 'show' : 'hide'} Event Details
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
                            rel='noopener norefferer'
                        >
                            See details on Google Calendar
                        </a>
                        <p className='description'>
                            {event.description}
                        </p>
                    </div>
                )}
            </div>
        )
    }
}

export default Event;
