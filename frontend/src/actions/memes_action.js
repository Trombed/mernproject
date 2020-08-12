import { saveMeme, getMemes, getMeme, getSingleMeme, deleteMeme, removeComment } from "../util/memes_util"


export const RECEIVE_NEW_MEMES = 'RECEIVE_NEW_MEMES'

export const receiveNewMemes = data => ({
    type: RECEIVE_NEW_MEMES,
    data
})

export const composeMemes = data => dispatch => {
    return (
            saveMeme(data)
                // .then( res => console.log(res.data))
                .then( res => {
            
                    window.location = `/#/${res.data}/`
                    
            })
                // .then(data => dispatch(receiveNewMemes(data)))
                .catch(err => console.log(err))
    )
}

export const RECEIVE_MEMES = 'RECEIVE_MEMES'

export const receiveMemes = data => ({
    type: RECEIVE_MEMES,
    data
})

export const RECEIVE_SINGLE_MEME = 'RECEIVE_SINGLE_MEME'

export const receiveSingleMeme = data => ({
    type: RECEIVE_SINGLE_MEME,
    data
})

export const fetchMemes = () => dispatch => (
    getMemes()
        .then( memes => dispatch(receiveMemes(memes)))
        .catch(err => console.log(err))
)


export const fetchMeme = (id) => dispatch => (
    getMeme(id)
        .then( memes => dispatch (receiveMemes(memes)))
        .catch(err => console.log(err))
)

export const fetchSingleMeme = (id) => dispatch => (
    getSingleMeme(id)
        .then( memes => dispatch (receiveSingleMeme(memes)))
        .catch(err => console.log(err))
)

export const DELETE_USER_MEME = 'DELETE_USER_MEME'

export const deleteUserMeme = id =>  ({
    type: DELETE_USER_MEME,
    id
})


export const deleteMemes = (id) => dispatch => (
    deleteMeme(id)
       
)

export const DELETE_COMMENT = 'DELETE_COMMENT'

export const deleteComment = (id, commentId) => ({
    type: DELETE_COMMENT,
    commentId
})

export const deleteUserComment = (id, commentId) => dispatch => (
    removeComment(id, commentId)
        .then(meme => dispatch(deleteComment(id, commentId)))
)
