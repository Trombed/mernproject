import axios from 'axios';

export const saveMeme = (data) => {
    return axios.post('/api/users/memes', data);
};