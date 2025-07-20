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

const BOOK_APPOINTMENT_URL = '/patientDashboard/book';
export const bookAppointment = async(token,availability_id)=>{
    try {
        const res = await api.post(BOOK_APPOINTMENT_URL,{availability_id},{
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        });
        return res?.data;
    } catch (error) {
        throw error;
    }
}

const APPOINTMENTS_URL = '/patientDashboard/appointments';
export const getAppointmentsList = async(user_id,token)=>{
    try {
        const res = await api.get(`${APPOINTMENTS_URL}/${user_id}`,{
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        throw error;
    }
}

const DELETE_APPOINTMENT_URL = '/patientDashboard/deleteappointment';
export const deleteAppointment = async(token , availability_id)=>{
    try {
        const res = await api.patch(`${DELETE_APPOINTMENT_URL}/${availability_id}`,{
            headers:{
                'Authorization' :  `Bearer ${token}`
            }
        });
        return res.data
    } catch (error) {
        throw error
    }
}