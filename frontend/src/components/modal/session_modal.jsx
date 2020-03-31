import React from 'react';
import { closeModal } from "../../actions/image_modal_actions";
import { connect } from 'react-redux';
import LoginFormContainer from '../session/login_form_container';
import SignupFormContainer from '../session/signup_form_container';
import GeneratorContainer from '../main/generator/generator_container'

function SessionModal({modal, closeModal}) {
  // debugger
  if (!modal) {
    return null;
  }
  let component;
  switch (modal) {
    case 'login':
      component = <LoginFormContainer />;
      break;
    case 'signup':
      component = <SignupFormContainer />;
      break;
    case 'createMeme':
      component = <GeneratorContainer />;
      break;
    default:
      return null;
  }
  if (modal !== 'createMeme') {
      return (
        <div className="modal-background" onClick={closeModal}>
          <div className="modal-child" onClick={e => e.stopPropagation()}>
            {component}
          </div>
        </div>
      );
  } else {
      return (
        <div className="modal-background" onClick={closeModal}>
          <div className="modal-child-create" onClick={e => e.stopPropagation()}>
            { component }
          </div>
        </div>
      );
    
  }
}

const mapStateToProps = state => {
  return {
    modal: state.ui.modal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionModal);