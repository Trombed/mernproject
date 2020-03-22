import { combineReducers } from 'redux';

import modal from './image_modal_reducer';
import session from './image_modal_reducer'

export default combineReducers({
    modal,
    session
});
