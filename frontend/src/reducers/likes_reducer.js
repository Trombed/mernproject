import {RECEIVE_NEW_LIKE, RECEIVE_DELETE_LIKE} from "../actions/like_action"

const LikesReducer = (state = {}, action) => {
    Object.freeze(state)

    const newState = Object.assign({}, state)
    switch(action.type) {
        case RECEIVE_NEW_LIKE:
            newState[action.data] = action.data
            return newState;
        case RECEIVE_DELETE_LIKE:
           
            delete newState[action.data]
            return newState
        default: 
            return state
    }
}

export default LikesReducer