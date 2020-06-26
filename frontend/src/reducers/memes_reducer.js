import { RECEIVE_MEMES, RECEIVE_NEW_MEMES} from '../actions/memes_action'


const MemesReducer = (state = {}, action) => {
    Object.freeze(state)

    switch(action.type) {
        case RECEIVE_NEW_MEMES:
            debugger
            return window.locaton = `/${action.data}/`
        case RECEIVE_MEMES:
            return Object.values(action.data.data)
        default:
            return state
    }

}

export default MemesReducer

