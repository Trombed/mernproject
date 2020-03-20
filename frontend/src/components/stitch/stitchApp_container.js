import { connect } from 'react-redux';
import StitchApp from './stitchApp'

const mSTP = state => {
    return {
        user: state.session.user,
    }
}

export default connect(mSTP, null)(StitchApp)