import axios from 'axios';
const apiURL = import.meta.env.VITE_BACKEND_API_URL;
const api = axios.create({
    baseURL: `${apiURL}`
});

export default api;