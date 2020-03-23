import { connect } from 'react-redux';
import Show from './show';
import { fetchMemes } from '../../../actions/memes_action';
import {openModal} from "../../../actions/image_modal_actions"
import {createNewLike, deleteOldLike} from "../../../actions/like_action"
import {composeReply } from "../../../actions/reply_action"


const mapStateToProps = state => ({
   currentUser: state.session.user,
   allMemes: Object.values(state.memes),
   likes: state.likes
});


const mapDispatchToProps = dispatch => ({
    fetchMemes: () => dispatch(fetchMemes()),
    openModal: (img) => dispatch(openModal(img)),
    createNewLike: (id) => dispatch(createNewLike(id)),
    deleteOldLike: (id) => dispatch(deleteOldLike(id)),
    composeReply: (data) => dispatch(composeReply(data))
    
})

export default connect(
    mapStateToProps,    
    mapDispatchToProps
)(Show);