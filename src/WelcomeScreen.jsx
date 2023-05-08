import React from 'react';
//import { getAccessToken } from './api';
import './WelcomeScreen.css';

function WelcomeScreen(props) {
    return props.WelcomeScreen ? (
        <div className='WelcomeScreen'>
            <h1>Welcome to shyMeets App</h1>
            <h4>
                Log in to see upcoming events for KolPlay orchestra and more
            </h4>
            <div className='button_cont' align="center">
                <div class="google-btn">
                    <div class="google-icon-wrapper">
                        <img
                            class="google-icon"
                            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Log o.svg"
                            alt="Google sign-in"
                        />
                    </div>
                    <button
                        class="btn-text"
                        onClick={() => { props.getAccessToken() }}
                        rel="nofollow noopener"
                    >
                        <b>Sign in with Google</b>
                    </button>
                </div>
            </div>
            <a href='https://shayalieb.github.io/shyMeets/privacy.html' rel='nofollow noopener'>Privacy Policy</a>
        </div>
    )
        : null
}

export default WelcomeScreen;
