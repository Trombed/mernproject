import axios from 'axios';

export const saveMeme = (data) => {

    return axios.post('/api/memes/', data);
};

export const getMemes = (data) => {
    return axios.get('/api/memes/')
}