import { RECEIVE_SINGLE_MEME, DELETE_COMMENT } from '../actions/memes_action'


const SingleMemeReducer = (state = {}, action) => {
    Object.freeze(state)

    switch(action.type) {
        case RECEIVE_SINGLE_MEME:
            
            return action.data.data
        case DELETE_COMMENT:
            const newState = Object.assign({}, state)
            debugger
            state.comments.forEach( (el, idx) => {
             if (el['_id'] === action.commentId ) {
                 delete newState.comments[idx]
             }
        })
            return newState
        default:
            return state
    }

}

export default SingleMemeReducer
