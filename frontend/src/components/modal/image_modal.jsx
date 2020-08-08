import React from 'react';
import { closeModal } from '../../actions/image_modal_actions';
import { connect } from 'react-redux';
import './image_modal.css'


function ImageModal({modal, closeModal}) {

  if (!modal) {
    window.onscroll = function () {};
    document.body.style.overflow = 'visible';
    return null;
  }
  

  if (modal === "signup" || modal === "login") {
    return (
      <div className="modal-background" onClick={closeModal}>
              <span className="Individual-Close" id="Modal-Close"
                          onClick={closeModal}>&times;</span>
        <div className="modal-child-meme" onClick={e => e.stopPropagation()}>
              <img className="Individual-Modal-Image" id="Modal-Image" alt="" src={modal}/>
        </div>
      </div>
    );
  } else if (modal === 'saving') {
    return (
      <div className='loader-background'>
        <div className="loader"></div>
        <div className="loader-text">Saving</div>
      </div>
    )
  } else {
    window.onscroll = function () { window.scrollTo(0, 0); };
        document.body.style.overflow = 'hidden';
    return (
      <div className="image-modal-background" onClick={closeModal}>
          <span className="Individual-Close" id="Modal-Close"
                        onClick={closeModal}>&times;</span>
          <div className="image-modal-child-meme" onClick={e => e.stopPropagation()}>
            <img className="Individual-Modal-Image" id="Modal-Image" alt="" src={modal}/>
          </div>
    </div>
    )
  }

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
