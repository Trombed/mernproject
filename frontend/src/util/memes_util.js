import axios from 'axios';

export const saveMeme = (data) => {

    return axios.post('/api/memes/', data);
};

export const getMemes = () => {
    return axios.get('/api/memes/', {
        params: {
            _limit: 10
        }
    })
}

export const getMeme = (id) => {
    return axios.get(`/api/memes/users/${id}`)
}

export const getSingleMeme = (id) => {
    return axios.get(`/api/memes/${id}`)
}

export const deleteMeme = (id) => {
    return axios.delete(`api/memes/${id}`);
}

export const createLike = (id) => {
    return axios.post(`api/memes/${id}/like`)
}

export const deleteLike = (id) => {
    return axios.delete(`api/memes/${id}/like`)
}


export const addComment = (id, body) => {
    return axios.post(`api/memes/${id}/comment`, body)
}

export const removeComment = (id) => {
    return axios.delete(`api/memes/${id}/comment`)
}
