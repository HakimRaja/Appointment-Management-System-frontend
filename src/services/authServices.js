import api from "../api/api";



export const signup = async(data) =>{
    const SIGNUP_URL = '/auth/signup';
    try {
        const response = await api.post(SIGNUP_URL,data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw (error)
    }
    
}

export const login = async(data) =>{
    const LOGIN_URL = '/auth/login';
    try {
        const response = await api.post(LOGIN_URL,data);
        return response.data;
    } catch (error) {
        throw (error);
    }
}
