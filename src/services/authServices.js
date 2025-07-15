import api from "../api/api";

export const signupUser = async(data) =>{
    try {
        const response = await api.post('/auth/signup',data);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Login Failed',error.response?.data?.message || 'Sign up failed');
        throw new Error(error.response?.data?.message || 'Sign up failed')
    }
    
}

export const loginUser = async(data) =>{
    try {
        const response = await api.post('/auth/login',data);
        console.log(response.data);
        // if (response.data.message) {
        //     return response.data?.message;
        // }
        return response.data;
    } catch (error) {
        console.error("Login failed:", error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || 'Login failed');
    }
}
