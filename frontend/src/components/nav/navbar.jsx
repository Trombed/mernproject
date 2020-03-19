import React from 'react';
import { Link } from 'react-router-dom'
import './navbar.css'

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
                   
                    {/* <Link to={'/tweets'}>All Tweets</Link>
                    <Link to={'/profile'}>Profile</Link>
                    <Link to={'/new_tweet'}>Write a Tweet</Link> */}
                    <button onClick={this.logoutUser} className="NavBar-Button">Logout</button>
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