import axios from 'axios';

export const saveMeme = (data) => {

    return axios.post('/api/memes/', data);
};

export const getMemes = () => {
    return axios.get('/api/memes/', {
        params: {
            _limit: 3
        }
    }) 
}