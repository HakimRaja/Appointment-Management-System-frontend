import api from "../api/api";

const GET_DOCTORS_URL = '/patientDashboard/doctors';
export const getDoctorsList = async(pageNumber) =>{
    try {
        const {token} = JSON.parse(localStorage.getItem('User')) || '';
        const headers = token.length !== 0 ? {
            Authorization : `Bearer ${token}`
        } : {};
        const queryParams = {pageNumber , doctorsPerPage : 4};
        const res = await api.get(GET_DOCTORS_URL,{headers , params : queryParams});
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
export const getAppointmentsList = async(payload)=>{
    try {
        const {token} = JSON.parse(localStorage.getItem('User')) || '';
        const headers = token.length !== 0 ? {
            Authorization : `Bearer ${token}`
        }:{} ;
        const queryParams = {
            pageNumber : payload.pageNumber,
            appointmentsPerPage : payload.appointmentsPerPage
        };
        const res = await api.get(APPOINTMENTS_URL,{headers,params : queryParams});
        return res.data;
    } catch (error) {
        throw error;
    }
}

const DELETE_APPOINTMENT_URL = '/patientDashboard/appointment';
export const deleteAppointment = async(token,availability_id)=>{
    try {
        const res = await api.delete(`${DELETE_APPOINTMENT_URL}/${availability_id}`,{
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        });
        return res.data
    } catch (error) {
        throw error
    }
}

const GET_AVAILABILITIES_FOR_UPDATE_URL = '/patientDashboard/appointment';
export const getAvailabilitiesForUpdate = async (token , doctor_id) => {
    try {
        const res = await api.get(`${GET_AVAILABILITIES_FOR_UPDATE_URL}/${doctor_id}`,{
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        });
        return res?.data;
    } catch (error) {
        throw error;
    }
}

const UPDATE_APPOINTMENT_URL = '/patientDashboard/appointment';
export const updateAppointment = async(token,appointment_id,availability_id)=>{
    try {
        const res = await api.patch(`${UPDATE_APPOINTMENT_URL}/${appointment_id}`,{availability_id},{
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        });
        return res?.data;
    } catch (error) {
        console.log(error?.message);
        throw error;
    }
}