import React from 'react';
import { withRouter } from 'react-router-dom';
import './session.css';


class SignLogForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            password2: '',
            errors: {}
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearedErrors = false;
        this.renderErrors = this.renderErrors.bind(this);
        this.handleDemo = this.handleDemo.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.signedIn === true) {
            this.props.history.push('/');
        }

        this.setState({ errors: nextProps.errors })
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        let user = {
            username: this.state.username,
            password: this.state.password,
            password2: this.state.password2
        }
        this.props.processForm(user).then(() => {
            if (this.state.errors.length === 0) {
                this.props.closeModal()
            }
        });
    }

    handleDemo(e) {
        e.preventDefault();
        let user = { username: "Guest_User", password: "password" }
        this.props.demoForm(user)
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
        const buttonText = (this.props.formType === 'signup') ? 'Sign Up!' : 'Log In!'
        return (
            <div className="session-form-container">
                <div className="form-header-container">
                    <div className="form-header-text">{buttonText}</div>
                    <div className="icon-container">
                        <div onClick={this.props.closeModal} className="close-x">X</div>
                    </div>

                </div>
                <form onSubmit={this.handleSubmit} className="session-form-box">
                    
                    

                    <div className="signup-form">
                        <div className="form-text-container">
                            <label className="form-text"> Username:
                            </label>
                        </div>

                        <div className="form-input-container">
                            <input className="form-input" type="text"
                                value={this.state.username}
                                onChange={this.update('username')}
                                placeholder="Username"
                            />
                        </div>

                        <div className="form-text-container">
                            <label className="form-text">
                                Password:
                            </label>

                        </div>
                        <div className="form-input-container">
                            <input className="form-input" type="password"
                                value={this.state.password}
                                onChange={this.update('password')}
                                placeholder="Password"
                            />

                        </div>
                        <div className="form-text-container">
                            <label className="form-text">
                                Confirm Password:
                            </label>
                        </div>

                        {
                            (this.props.formType === 'signup') ?
                                <div className="form-input-container">
                                    <input className="form-input" type="password"
                                        value={this.state.password2}
                                        onChange={this.update('password2')}
                                        placeholder="Confirm Password"
                                    />
                                </div>
                                :
                                ''
                        }

                        <div className="form-button-container">
                            <input className="form-button" type="submit" value={buttonText} />
                            <input className="form-button" type="submit" onClick={this.handleDemo} value="Continue with Guest User" />
                        </div>
                    </div>
                    <div className="login-errors">
                        {this.renderErrors()}
                    </div>
                </form>
            </div>
        );
    }
}
export default withRouter(SignLogForm);