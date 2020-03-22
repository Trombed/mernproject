import { addComment, removeComment } from "../util/memes_util"

export const RECEIVE_NEW_COMMENT = 'RECEIVE_NEW_COMMENT'

export const receiveNewComment = data => ({
    type: RECEIVE_NEW_COMMENT,
    data
})

export const composeReply = (data) => dispatch => {
    return (
        addComment(data.id, data)
            .then(res => dispatch(receiveNewComment(data)))  
            .catch(err => console.log(err))
    )
}

export const REMOVE_OLD_COMMENT = 'REMOVE_OLD_COMMENT'

export const removeOldComment = data => ({
    type: removeComment,
    data
})

export const deleteComment = data => dispatch => {
    return (
        removeComment(data)
            .then( res => dispatch(removeOldComment(data)))
            .catch(err => console.log(err))
    )
}