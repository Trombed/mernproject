import React from 'react';



const Greeting = ({ currentUser, logout, openModal }) => {

    const sessionLinks = () => (
        <nav className="login-signup">
            <button className="login-signup-button" onClick={() => openModal('login')}>Log In</button>
            &nbsp; &nbsp;
            <button className="login-signup-button" onClick={() => openModal('signup')}>Sign Up</button>
        </nav>
    );
    const personalGreeting = () => (
        <hgroup className="header-group">
            <h2 className="header-name">Hi, {currentUser.username}!</h2>
            <button className="header-button" onClick={logout}>Log Out</button>
        </hgroup>
    );

    return (
        currentUser ?
            personalGreeting(currentUser, logout) :
            sessionLinks()
    );
};

export default Greeting;
