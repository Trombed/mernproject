import { createLike, deleteLike } from '../util/memes_util'

export const RECEIVE_NEW_LIKE = 'RECEIVE_NEW_LIKE'

export const receiveNewLike = (data) => ({
    type: RECEIVE_NEW_LIKE,
    data
})

export const createNewLike = (id) => dispatch => (
   
    createLike(id)
        .then( like => dispatch(receiveNewLike(id)))
        .catch(err => console.log(err))

)


export const RECEIVE_DELETE_LIKE = 'RECEIVE_DELETE_LIKE'

export const receiveDeleteLike = (data) => ({
    type: RECEIVE_DELETE_LIKE,
    data
})

export const deleteOldLike = (id) => dispatch => (
    deleteLike(id)
        .then( res => dispatch(receiveDeleteLike(id)))
        .catch(err => console.log(err))
)