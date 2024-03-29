import React, { Component } from "react";

class Alert extends Component {
    constructor(props) {
        super(props);
        this.color = null;//set to null as the children will override this later
    }

    getStyle = () => {
        return {
            color: this.color,
        };
    }

    render() {
        return (
            <div className="alert">
                <p style={this.getStyle()}>{this.props.text}</p>
            </div>
        );
    }
}

class InfoAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = 'blue'
    }
}

class ErrorAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = 'red'
    }
}

class WarningAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = 'orange'
    }
}

export { InfoAlert, ErrorAlert, WarningAlert };