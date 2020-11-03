import React from 'react';
import { withRouter } from 'react-router-dom';
import './session.css';
import close from '../../../src/images/close.svg'
import logo from '../../../src/images/Memegram.png'


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
        this.checkField = this.checkField.bind(this)
    }

    componentDidMount() {
        window.onscroll = function () { window.scrollTo(0, 0); };
        document.body.style.overflow = 'hidden';
    }

    componentWillUnmount() {
        window.onscroll = function () {};
        document.body.style.overflow = 'visible';
    }

    componentWillReceiveProps(nextProps) {
        // if (nextProps.signedIn === true) {
        //     this.props.history.push('/');
        // }

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
            if (Object.keys(this.state.errors).length === 0) {
                this.props.closeModal()
            } else {
                // debugger
            }
        });
    }

    handleDemo(e) {
        e.preventDefault();
        let user = { username: "Guest_User", password: "password" }
        this.props.demoForm(user)
                  .then(this.props.closeModal);
    }

    checkField(e) {
        e.preventDefault();

        let user = this.state.username === "";
        let pw = this.state.password  === "";
        let pw2 = this.state.password2  === "";
        if (this.props.formType === 'signup') {
            if ( !user || !pw || pw2) {
                return 
            }
        } else if (this.props.formType === 'login') {
            if ( !user || !pw ) {
                return 
            }
        }
        this.handleDemo()
    }

    renderErrors() {
        return (
            <ul>
                {Object.keys(this.state.errors).map((error, i) => (
                    <li key={`error-${i}`} className="Session-Errors">
                        {this.state.errors[error]}
                    </li>
                ))}
            </ul>
        );
    }

    render() {
        const buttonText = (this.props.formType === 'signup') ? 
            'Sign Up' 
            : 
            'Login'
        return (
            <div className="session-form-container">
                <div className="form-header-container">
                    <div className="form-header-text">
                        <img src={logo} alt=""/>
                    </div>
                    <div className="icon-container">
                        <div onClick={this.props.closeModal}><img src={close} alt=""   className="close" /></div>
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
                        {
                            (this.props.formType === 'signup') ?
                                <div className="f\
                                orm-input-container">

                                    <div className="form-text-container">
                                        <label className="form-text">
                                            Confirm Password:
                                        </label>
                                    </div>
                                    <input className="form-input" type="password"
                                        value={this.state.password2}
                                        onChange={this.update('password2')}
                                        placeholder="Confirm Password"
                                    />
                                </div>
                                :
                                ''
                        }

                        <div className="login-errors">
                            {this.renderErrors()}
                        </div>

                        <div className="form-button-container">
                            <input className="form-button-submit" type="submit" value={buttonText} />
                            <div className="form-demo-user" type="submit" onClick={ (e) =>this.handleDemo(e)}>
                                Sign in as demo user.
                            </div>
                        </div>
                    </div>
                   
                </form>
            </div>
        );
    }
}
export default withRouter(SignLogForm);