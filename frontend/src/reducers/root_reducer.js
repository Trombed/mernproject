import { combineReducers } from 'redux';
import session from './session_reducer';
import errors from './errors_reducer';
import MemesReducer from './memes_reducer';
import modalReducer from './image_modal_reducer';
import LikesReducer from './likes_reducer';
import ReplyReducer from './comment_reducer';
import ui from './ui_reducer';


const RootReducer = combineReducers({
    session,
    errors,
    memes: MemesReducer,
    modal: modalReducer,
    likes: LikesReducer,
    reply: ReplyReducer,
    ui
});

export default RootReducer;


