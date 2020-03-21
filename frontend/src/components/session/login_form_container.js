import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import LoginForm from './login_form';
import { openModal, closeModal } from '../../actions/modal_actions';
import SessionForm from './session_form';

const mapStateToProps = (state) => {
    return {
        errors: state.errors.session,
        formType: 'login',
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        processForm: (user) => dispatch(login(user)),
        otherForm: (
            <button onClick={() => dispatch(openModal('signup'))}>
                Sign up
            </button>
        ),
        closeModal: () => dispatch(closeModal())





        // login: user => dispatch(login(user))
    }
}

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(LoginForm); //?

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);