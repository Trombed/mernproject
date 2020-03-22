import React from 'react';
import { Link } from 'react-router-dom'
import './navbar.css'
import GreetingContainer from '../greeting/greeting_container';



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
                </div>
            );
        } else {
            return (
            <GreetingContainer />
            )
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