import { RECEIVE_MEMES} from '../actions/memes_action'


const MemesReducer = (state = {}, action) => {
    Object.freeze(state)

    switch(action.type) {
        case RECEIVE_MEMES:
        
            return Object.values(action.data.data)
        default:
            return state
    }

}

export default MemesReducer

