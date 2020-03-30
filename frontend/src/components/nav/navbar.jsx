import React from 'react';
import { Link } from 'react-router-dom'
import './navbar.css'
import GreetingContainer from '../greeting/greeting_container';



class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.logoutUser = this.logoutUser.bind(this);
        this.sessionStatus = this.sessionStatus.bind(this);
        this.memeStatus = this.memeStatus.bind(this);
        this.user = this.props.user
    }

    logoutUser(e) {
        e.preventDefault();
        this.props.logout();
    }

    memeStatus() {
        if (this.props.loggedIn) {
            return(
            <div>
                <button>Create Meme!</button>

            </div>
            );
        } else {
            return(
            <div>
                <button>Login and Create memes!</button>
            </div>
            );
        }
    }

    sessionStatus() {
        if (this.props.loggedIn) {
            return (
                <div className="navbar-links"> 
                    <input type="submit" value={`Welcome ${this.user.username}`} />
                    <button onClick={this.logoutUser} className="logout-button">Logout</button>
                </div>
            );
        } else {
            return (
                <div className="navbar-links">
                    <GreetingContainer />
            </div>
            )
        }
    }

    render() {
        return (
            <div className="NavBar-Container">
                <div className="NavBar-Title">
                    <Link to='/'>Mememakewitter</Link>
                </div>
                <div>
                    <Link to={`/randommemes`}>Check Out Some Memes!</Link>
                </div>
                <div>{this.memeStatus()}</div>
                <div>{this.sessionStatus()}</div>
            </div>
        );
    }
}

export default NavBar;