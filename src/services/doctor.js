import api from "../api/api";

const GET_DOCTOR_AVAILABILITIES_URL = '/doctordashboard/availabilities';
export const getAvailabilities = async (token,doctor_id) => {
    try {
        const res = await api.get(`${GET_DOCTOR_AVAILABILITIES_URL}/${doctor_id}`,{
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        });
        return res?.data;
    } catch (error) {
        throw error;
    };
};
const ADD_AVAILABILITIES_URL = '/doctordashboard/availabilities'
export const addDoctorAvailabilities = async (token,timeSlots,date) => {
    try {
        const res = await api.post(ADD_AVAILABILITIES_URL,{timeSlots,date},{
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        })
        return res?.data;
    } catch (error) {
        throw error;
    }
}