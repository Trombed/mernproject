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
            password: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.processForm(user).then(this.props.closeModal);
    }

    renderErrors() {
        return (
            <ul>
                {this.props.errors.map((error, i) => (
                    <li key={`error-${i}`}>
                        {error}
                    </li>
                ))}
            </ul>
        );
    }

    render() {
        return (
            <div className="session-form-container">
                <div className="form-header-container">
                    <div className="form-header-text">Sign In</div>
                    <div className="icon-container">
                        <div onClick={this.props.closeModal} className="close-x">X</div>
                    </div>

                </div>
                <form onSubmit={this.handleSubmit} className="login-form-box">

                    {this.renderErrors()}
                    <div className="login-form">
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
                            <input className="form-button" type="submit" value="Sign In"/>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(SessionForm);
