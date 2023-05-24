import React from 'react'
import './WelcomeScreen.css';
import Logo from './img/shymeets-low-resolution-color-logo.png'
import googleIcon from './img/Google__G__Logo.svg.png'

function WelcomeScreen(props) {
    return props.showWelcomeScreen ?
        (
            <div className='WelcomeScreen'>
                <img className='welcome-logo' src={Logo} alt='logo' />
                <div className='welcome-screen'>
                    <h1>Welcome to shyMeets App</h1>
                    <h4>Login to view all upcoming events for KolPlay Orchestra</h4>
                </div>
                <div className='button_cont' align='center'>
                    <div class='google-btn'>
                        <div class='google-icon-wrapper'>
                            <img
                                class='google-icon'
                                src={googleIcon}
                                alt='Google sign-in'
                            />
                            <button
                                onClick={() => { props.getAccessToken() }}
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
            </div>
        ) : null
}

export default WelcomeScreen