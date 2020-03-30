import { connect } from 'react-redux';
import Generator from './generator';
import { composeMemes } from '../../../actions/memes_action'
import { closeModal } from '../../../actions/image_modal_actions';



const mapStateToProps = state => ({
   currentUser: state.session.user 
});


const mapDispatchToProps = dispatch => ({
 
    composeMemes: data => dispatch(composeMemes(data)),
    closeModal: () => dispatch(closeModal())
})

export default connect(
    mapStateToProps,    
    mapDispatchToProps
)(Generator);