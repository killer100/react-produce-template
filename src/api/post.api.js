import axios from 'axios';

const baseUrl = 'https://jsonplaceholder.typicode.com';

export const FetchPosts = () =>
    axios
        .get(`${baseUrl}/posts`)
        .then(resp => resp.data)
        .catch(err => {
            throw err;
        });

export const FetchComments = id =>
    axios
        .get(`${baseUrl}/posts/${id}/comments`)
        .then(resp => resp.data)
        .catch(err => {
            throw err;
        });
