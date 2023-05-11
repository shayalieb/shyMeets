import React from 'react'
import './WelcomeScreen.css';

function WelcomeScreen(props) {
    return props.showWelcomeScreen ?
        (
            <div className='WelcomeScreen'>
                <h1>Welcome to shyMeets App</h1>
                <h4>Login to view all upcoming events for KolPlay Orchestra</h4>
                <div className='button_cont' align='center'>
                    <div class='google-btn'>
                        <div class='google-icon-wrapper'>
                            <img
                                class='google-icon'
                                src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Log o.svg'
                                alt='Google sign-in'
                            />
                        </div>
                        <button
                            onClick={() => { props.getAccessToken }}
                            rel='nofollow noopener'
                            class='btn-text'
                        >
                            <b>Sign in with Google</b>
                        </button>
                    </div>
                </div>
                <a href='https://shayalieb.github.io/shyMeets/privacy.html'
                    rel='nofollow noopener'>
                    <a href='https://shayalieb.github.io/shyMeets/privacy.html'>Privacy Policy</a>
                </a>

            </div>
        ) : null
}

export default WelcomeScreen