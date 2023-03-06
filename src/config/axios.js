import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://elspectra-cat-clicker.onrender.com/api'
    // baseURL: 'http://localhost:8000/api'
});

export default instance;