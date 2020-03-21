import { combineReducers } from 'redux';
import session from './session_reducer';
import errors from './errors_reducer';
import MemesReducer from './memes_reducer';
import modalReducer from './modal_reducer';

const RootReducer = combineReducers({
    session,
    errors,
    memes: MemesReducer,
    modal: modalReducer
    
});

export default RootReducer;


