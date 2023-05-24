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
                    <h4>Login to view all upcoming events and tasks from around the world</h4>
                </div>
                <div className='button_cont' align='center'>
                    <div class='google-btn'>
                        <div class='google-icon-wrapper'>
                            <img
                                class='google-icon'
                                src={googleIcon}
                                alt='Google sign-in'
                            />
                            </div>
                            <button
                                onClick={() => { props.getAccessToken() }}
                                rel='nofollow noopener'
                                class='btn-text'
                            >
                                <b>Sign in with Google</b>
                            </button>
                        
                    </div>

                    <a href='https://shayalieb.github.io/shyMeets/privacy.html' rel='nofollow noopener'>
                        <h4>Privacy Policy</h4>
                    </a>
                </div>
            </div>
        ) : null
}

export default WelcomeScreen