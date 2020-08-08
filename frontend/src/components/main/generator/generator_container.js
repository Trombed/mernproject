import { connect } from 'react-redux';
import Generator from './generator';
import { composeMemes } from '../../../actions/memes_action';
import { closeModal, openModal } from '../../../actions/image_modal_actions';
import { fetchMemes } from '../../../actions/memes_action';



const mapStateToProps = state => ({
   currentUser: state.session.user 
});


const mapDispatchToProps = dispatch => ({
 
    composeMemes: data => dispatch(composeMemes(data)),
    openModal: (modal) => dispatch(openModal(modal)),
    fetchMemes: () => dispatch(fetchMemes()),
    closeModal: () => dispatch(closeModal())
});

export default connect(
    mapStateToProps,    
    mapDispatchToProps
)(Generator);