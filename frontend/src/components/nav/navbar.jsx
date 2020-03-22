import React from 'react';
import { Link } from 'react-router-dom'
import './navbar.css'
import Greeting from '../greeting/greeting';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.logoutUser = this.logoutUser.bind(this);
        this.getLinks = this.getLinks.bind(this);
    }

    logoutUser(e) {
        e.preventDefault();
        this.props.logout();
    }

    getLinks() {
        if (this.props.loggedIn) {
            return (
                <div> 
                    <button onClick={this.logoutUser} className="NavBar-Button">Logout</button>
                    <Link to={`/randommemes`}>Check This Out!</Link>
                </div>
            );
        } else {
            return (
                <div className="NavBar-Sessions">
                    <div className="NavBar-Session-Links">
                    <Link to={'/signup'}>Signup</Link>
                    </div>
                    <div className='NavBar-Session-Links'>
                    <Link to={'/login'}>Login</Link>
                    </div>
                    <div>
                    <Link to={`/randommemes`}>Check This Out!</Link>
                    </div>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="NavBar-Container">
                <div className="NavBar-Title">Mememakewitter</div>
                <div>{this.getLinks()}</div>
            </div>
        );
    }
}

export default NavBar;