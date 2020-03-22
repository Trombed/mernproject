import { RECEIVE_NEW_COMMENT, REMOVE_OLD_COMMENT} from "../actions/reply_action"

const ReplyReducer = (state = [], action) => {
    Object.freeze(state)

    const newState = Object.assign([], state)
    switch(action.type) {
        case RECEIVE_NEW_COMMENT:
            newState.push(action.data)
            return newState;
        case REMOVE_OLD_COMMENT:
           
            delete newState[action.data]
            return newState
        default: 
            return state
    }
}

export default ReplyReducer