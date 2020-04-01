import React from 'react';
import { Link } from 'react-router-dom'
import './navbar.css'


class NavBar extends React.Component {
    constructor(props) {
        super(props)
        this.sessionStatus = this.sessionStatus.bind(this);
        this.memeStatus = this.memeStatus.bind(this);
    }

    memeStatus() {
        if (this.props.loggedIn) {
            return(
            <div>
                <button className="create-meme-button" onClick={() => this.props.openModal('createMeme')}>Create Memes!</button>

            </div>
            );
        } else {
            return(
            <div>
                <div className="message">Login to Create Memes</div>
            </div>
            );
        }
    }

    sessionStatus() {
        if (this.props.loggedIn) {
            // debugger
            return (
                <div className="navbar-links"> 
                    <div className="navbar-userprofile">{`Welcome, ${this.props.user.username}`}</div>
                    <button onClick={() => this.props.logout()} className="logout-button">Logout</button>
                </div>
            );
        } else {
            return (
                <div className="navbar-links">

                    <button className="login-signup-button" onClick={() => this.props.openModal('login')}>Log In</button>
                    <button className="login-signup-button" onClick={() => this.props.openModal('signup')}>Sign Up</button>
                   
                </div>
            )
        }
    }

    render() {
        return (
            <div className="navbar-container">
                <div className="navbar-title">
                    <Link to='/'>Mememakewitter</Link>
                </div>
                <div className="navbar-links">
                    <Link to={`/randommemes`}>Explore Memes</Link>
                </div>
                <div>{this.memeStatus()}</div>
                <div>{this.sessionStatus()}</div>
            </div>
        );
    }
}

export default NavBar;