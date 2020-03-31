import { connect } from 'react-redux';
import { login, signup } from '../../actions/session_actions';
import SignLogForm from './signlog_form'
import { closeModal } from '../../actions/image_modal_actions';

const mapStateToProps = (state) => {
    return {
        signedIn: state.session.isSignedIn,
        errors: state.errors.session,
        formType: 'signup',
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        processForm: (user) => dispatch(signup(user)),
        demoForm: user => dispatch(login(user)),
        closeModal: () => dispatch(closeModal())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignLogForm);