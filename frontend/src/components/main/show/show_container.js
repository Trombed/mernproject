import { connect } from 'react-redux';
import Show from './show';
import { fetchMemes } from '../../../actions/memes_action';
import {openModal} from "../../../actions/modal_actions"



const mapStateToProps = state => ({
   currentUser: state.session.user,
   allMemes: Object.values(state.memes)
});


const mapDispatchToProps = dispatch => ({
    fetchMemes: () => dispatch(fetchMemes()),
    openModal: (img) => dispatch(openModal(img))
    
})

export default connect(
    mapStateToProps,    
    mapDispatchToProps
)(Show);