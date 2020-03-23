import React from 'react';
import { connect } from 'react-redux';
import { login  } from '../../actions/session_actions';
import { openModal, closeModal } from '../../actions/image_modal_actions';
// import SessionForm from './session_form';
import SignLogForm from './signlog_form'

const mapStateToProps = (state) => {
    return {
        signedIn: state.session.isSignedIn,
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
        demoForm: user => dispatch(login(user)),
        closeModal: () => dispatch(closeModal())





        // login: user => dispatch(login(user))
    }
}

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(LoginForm); //?

export default connect(mapStateToProps, mapDispatchToProps)(SignLogForm);