import { RECEIVE_SINGLE_MEME } from '../actions/memes_action'


const SingleMemeReducer = (state = {}, action) => {
    Object.freeze(state)

    switch(action.type) {
        case RECEIVE_SINGLE_MEME:
          
            return action.data.data
        default:
            return state
    }

}

export default SingleMemeReducer
