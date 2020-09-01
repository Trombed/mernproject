import { connect } from 'react-redux';
import SingleShow from './single_meme';
import { fetchSingleMeme, deleteMemes, deleteUserComment } from '../../../actions/memes_action';
import {openModal, closeModal} from "../../../actions/image_modal_actions"
import {createNewLike, deleteOldLike} from "../../../actions/like_action"
import {composeReply } from "../../../actions/reply_action"



const mapStateToProps = (state, ownProps) => ({
   loggedIn: state.session.isAuthenticated,
   currentUser: state.session.user,
   oneMeme: state.singleMeme,
   likes: state.likes
});


const mapDispatchToProps = dispatch => ({
    fetchSingleMeme: (id) => dispatch(fetchSingleMeme(id)),
    openModal: (img) => dispatch(openModal(img)),
    closeModal: () => dispatch(closeModal()),
    createNewLike: (id) => dispatch(createNewLike(id)),
    deleteOldLike: (id) => dispatch(deleteOldLike(id)),
    composeReply: (data) => dispatch(composeReply(data)),
    deleteMemes: (id) => dispatch(deleteMemes(id)),
    deleteUserComment: (id, commentId) => dispatch(deleteUserComment(id, commentId))
})

export default connect(
    mapStateToProps,    
    mapDispatchToProps
)(SingleShow);