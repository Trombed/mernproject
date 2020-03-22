import { connect } from 'react-redux';
import IndividualShow from './individual_show';
import { fetchMeme } from '../../../actions/memes_action';
import {openModal} from "../../../actions/image_modal_actions"
import {createNewLike, deleteOldLike} from "../../../actions/like_action"
import {composeReply } from "../../../actions/reply_action"


const mapStateToProps = (state, ownProps) => ({
   currentUser: state.session.user,
   singleMeme: Object.values(state.memes),
   likes: state.likes
});


const mapDispatchToProps = dispatch => ({
    fetchMeme: (id) => dispatch(fetchMeme(id)),
    openModal: (img) => dispatch(openModal(img)),
    createNewLike: (id) => dispatch(createNewLike(id)),
    deleteOldLike: (id) => dispatch(deleteOldLike(id)),
    composeReply: (data) => dispatch(composeReply(data))
})

export default connect(
    mapStateToProps,    
    mapDispatchToProps
)(IndividualShow);