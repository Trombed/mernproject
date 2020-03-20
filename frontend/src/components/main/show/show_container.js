import { connect } from 'react-redux';
import Show from './show';
import { fetchMemes } from '../../../actions/memes_action';




const mapStateToProps = state => ({
   currentUser: state.session.user,
   allMemes: Object.values(state.memes)
});


const mapDispatchToProps = dispatch => ({
    fetchMemes: () => dispatch(fetchMemes())
    
})

export default connect(
    mapStateToProps,    
    mapDispatchToProps
)(Show);