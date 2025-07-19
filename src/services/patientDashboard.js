import api from "../api/api";

const GET_DOCTORS_URL = '/patientDashboard/doctors';
export const getDoctorsList = async(token) =>{
    try {
        const res = await api.get(GET_DOCTORS_URL,{
            headers : {
                'Authorization' : `Bearer ${token}`,
            }});
        return res?.data;
    } catch (error) {
        console.log(error);
        throw error
    }
}