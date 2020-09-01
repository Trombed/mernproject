import { connect } from 'react-redux';
import Generator from './generator';
import { composeMemes } from '../../../actions/memes_action';
import { closeModal, openModal } from '../../../actions/image_modal_actions';
import { fetchMemes } from '../../../actions/memes_action';



const mapStateToProps = state => ({
   currentUser: state.session.user,
   blank: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAHgAQMAAAAPH06nAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAANQTFRF////p8QbyAAAAD1JREFUeJztwQENAAAAwqD3T20ON6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4M8Al+AAAfQ5dkcAAAAASUVORK5CYII="
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