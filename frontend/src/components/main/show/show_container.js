import { connect } from 'react-redux';
import Show from './show';




const mapStateToProps = state => ({
   currentUser: state.session.user 
});


const mapDispatchToProps = dispatch => ({
    
    
})

export default connect(
    mapStateToProps,    
    mapDispatchToProps
)(Show);