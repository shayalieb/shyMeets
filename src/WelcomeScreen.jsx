import React, { Component } from 'react';
import { getAccessToken } from './api';
import './WelcomeScreen.css';

class WelcomeScreen extends Component {
    state = {
        getAccessToken: this.props.getAccessToken
    }

    render() {
        return (
            <div className="WelcomeScreen" >
                <h1>Welcome to the shyMeets App</h1>
                <h4>
                    Log in to see upcoming events for KolPlay orchestra, and more
                </h4>
                <div className="button_cont" align="center">
                    <div className="google-btn">
                        <div className="google-icon-wrapper">
                            <img
                                className="google-icon"
                                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Log o.svg"
                                alt="Google sign-in"
                            />
                        </div>
                        <button
                            onClick={() => { this.state.getAccessToken() }}
                            rel="nofollow noopener"
                            className="btn-txt"
                        >
                            <b>Sign in with Google</b>
                        </button>
                    </div>
                </div>
                <a
                    href="https://shayalieb.github.io/shyMeets/privacy.html"
                    rel="nofollow noopener"
                >
                    Privacy Policy
                </a>
            </div>
        );
    }
}

export default WelcomeScreen;