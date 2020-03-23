import React from 'react';
import { withRouter } from 'react-router-dom';
import './session.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faTimes } from '@fortawesome/free-solid-svg-icons'

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errors: {}
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDemo = this.handleDemo.bind(this)
    }

    handleDemo(e) {
        e.preventDefault();
        let user = { email: "Guest_User", password: "password" }
        this.props.demoForm(user)
            .then(this.props.closeModal);
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.login(user)
            .then(this.props.closeModal);
    }

    renderErrors() {
        return (
            <ul>
                {Object.keys(this.state.errors).map((error, i) => (
                    <li key={`error-${i}`}>
                        {this.state.errors[error]}
                    </li>
                ))}
            </ul>
        );
    }

    render() {
        return (
            <div className="session-form-container">
                <div className="form-header-container">
                    <div className="form-header-text">Log In</div>
                    <div className="icon-container">
                        <div onClick={this.props.closeModal} className="close-x">X</div>
                    </div>

                </div>
                <form onSubmit={this.handleSubmit} className="session-form-box">

                    {this.renderErrors()}
                    <div className="session-form">
                        <div className="form-text-container">
                            <label className="form-text"> Username:
                            </label>
                        </div>
                        <div className="form-input-container">
                            <input type="text"
                                value={this.state.username}
                                onChange={this.update('username')}
                                className="form-input"
                            />
                        </div>
                        <div className="form-text-container">
                            <label className="form-text">
                                Password:
                            </label>
                        </div>
                        <div className="form-input-container">
                            <input type="password"
                                value={this.state.password}
                                onChange={this.update('password')}
                                className="form-input"
                            />
                        </div>
                        <div className="form-button-container">
                            <input className="form-button" type="submit" value="Log Up!" />
                            <input className="form-button" type="submit" onClick={this.handleDemo} value="Continue with Guest User" />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(SessionForm);
