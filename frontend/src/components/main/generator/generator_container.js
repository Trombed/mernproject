import { connect } from 'react-redux';
import Generator from './generator';
import { composeMemes } from '../../../actions/memes_action'



const mapStateToProps = state => ({
   currentUser: state.session.user 
});


const mapDispatchToProps = dispatch => ({
 
    composeMemes: data => dispatch(composeMemes(data))
})

export default connect(
    mapStateToProps,    
    mapDispatchToProps
)(Generator);