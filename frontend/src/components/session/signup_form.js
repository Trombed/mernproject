import React from 'react';
import { withRouter } from 'react-router-dom';

class SignupForm extends React.Component {
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
        };

        this.props.signup(user, this.props.history);
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
            <div className="signup-form-container">
                <form onSubmit={this.handleSubmit} className="login-form-box">
                    {/* Please {this.props.formType} or {this.props.otherForm} */}
                    <div onClick={this.props.closeModal} className="close-x">X</div>
                   Sign Up
                    {this.renderErrors()}
                    <div className="signup-form">
                        <br />
                         <label> Username: 
                            <input type="text"
                            id="signup-input"
                            value={this.state.username}
                            onChange={this.update('username')}
                            placeholder="Username"
                            />
                        </label>
                        <br />
                        <label>
                            Password: 
                            <input type="password"
                                id="signup-input"
                                value={this.state.password}
                                onChange={this.update('password')}
                                placeholder="Password"
                            />
                        </label>
                        <br />
                        <label>
                            Confirm Password: 
                            <input type="password"
                                id="signup-input"
                                value={this.state.password2}
                                onChange={this.update('password2')}
                                placeholder="Confirm Password"
                            />      
                        </label>
                        <br />
                        <input type="submit" value="Submit" />
                        {this.renderErrors()}
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(SignupForm);