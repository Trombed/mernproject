import { saveMeme } from "../util/memes_util"


export const RECEIVE_NEW_MEMES = 'RECEIVE_NEW_MEMES'

export const receiveNewMemes = data => ({
    type: RECEIVE_NEW_MEMES,
    data
})

export const composeMemes = data => dispatch => {
    return (
            saveMeme(data)
                .then(data => dispatch(receiveNewMemes(data)))
                .catch(err => console.log(err))
    )
}