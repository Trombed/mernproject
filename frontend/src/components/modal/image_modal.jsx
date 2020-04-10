import React from 'react';
import { closeModal } from '../../actions/image_modal_actions';
import { connect } from 'react-redux';
import './image_modal.css'

function ImageModal({modal, closeModal}) {
  if (!modal) {
    return null;
  }

  return (
    <div className="modal-background" onClick={closeModal}>
            <span className="Individual-Close" id="Modal-Close"
                        onClick={closeModal}>&times;</span>
      <div className="modal-child-meme" onClick={e => e.stopPropagation()}>
            <img className="Individual-Modal-Image" id="Modal-Image" alt="" src={modal}/>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    modal: state.modal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageModal);
