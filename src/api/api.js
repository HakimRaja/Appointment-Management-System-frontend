import axios from 'axios';
const apiURL = import.meta.BACKEND_API_URL;

const api = axios.create({
    baseURL: `${apiURL}`
});

export default api;