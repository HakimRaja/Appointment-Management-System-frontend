import api from "../api/api";

const CHECK_AUTHENTICATION_URL = '/auth/authorized';

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

export const checkauthentication = async(token)=>{
    try {
        const response = await api.get(CHECK_AUTHENTICATION_URL,{
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        });
        return response?.data;
    } catch (error) {
        throw (error)
    }
}
