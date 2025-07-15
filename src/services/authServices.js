import api from "../api/api";



export const signup = async(data) =>{
    const SIGNUP_URL = '/auth/signup';
    const SIGNUP_FAIL_MESSAGE = 'Sign up failed';
    try {
        const response = await api.post(SIGNUP_URL,data);
        return response.data;
    } catch (error) {
        console.error('Signup Failed',error.response?.data?.message || 'Sign up failed');
        throw new Error(error.response?.data?.message || SIGNUP_FAIL_MESSAGE)
    }
    
}

export const login = async(data) =>{
    const LOGIN_URL = '/auth/login';
    const LOGIN_FAIL_MESSAGE = 'Login failed';
    try {
        const response = await api.post(LOGIN_URL,data);
        return response.data;
    } catch (error) {
        console.error("Login failed:", error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || LOGIN_FAIL_MESSAGE);
    }
}
