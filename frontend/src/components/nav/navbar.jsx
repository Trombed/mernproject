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
                </div>
            );
        } else {
            //need to make this pull in the log in buttons from Greeting
            // <Greeting/>
            
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