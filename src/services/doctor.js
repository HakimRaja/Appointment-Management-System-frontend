import api from "../api/api";


const GET_DOCTOR_AVAILABILITIES_URL = "/doctordashboard/availabilities";
export const getAvailabilities = async (payload) => {
  try {
    const { token } = JSON.parse(localStorage.getItem("User")) || "";
    const headers = token.length !==0 ?  
        {
          Authorization: `Bearer ${token}`,
        }: {};

    const res = await api.get(`${GET_DOCTOR_AVAILABILITIES_URL}`,{headers,params : payload});
    return res?.data;
  } catch (error) {
    throw error;
  }
};
const GET_DOCTOR_AVAILABILITIES_ALL_URL = '/doctordashboard/availabilities/all';
export const getAllAvailabilities = async () => {
  try {
    const { token } = JSON.parse(localStorage.getItem("User")) || "";
    const headers = token.length !==0 ?  
        {
          Authorization: `Bearer ${token}`,
        }: {};

    const res = await api.get(`${GET_DOCTOR_AVAILABILITIES_ALL_URL}`,{headers});
    return res?.data;
  } catch (error) {
    throw error;
  }
};

const ADD_AVAILABILITIES_URL = "/doctordashboard/availabilities";
export const addDoctorAvailabilities = async (payload) => {
  try {
    const { token } = JSON.parse(localStorage.getItem("User")) || "";
    const headers = token.length !==0 ?  
        {
          Authorization: `Bearer ${token}`,
        }: {};
    
    const res = await api.post(
      ADD_AVAILABILITIES_URL,
      { payload },
      {
        headers
      }
    );
    return res?.data;
  } catch (error) {
    throw error;
  }
};

const DELETE_AVAILABILITY_SLOT = "/doctordashboard/availability";
export const deleteAvailabilitySlot = async (availability_id) => {
  try {
    const { token } = JSON.parse(localStorage.getItem("User")) || "";
    const headers = token.length !==0 ?  
        {
          Authorization: `Bearer ${token}`,
        }: {};

    const res = await api.delete(
      `${DELETE_AVAILABILITY_SLOT}/${availability_id}`,
      {
        headers
      }
    );
    return res;
  } catch (error) {
    throw error;
  }
};

const CANCEL_APPOINTMENT_AND_REMOVE_AVAILABILITY_URL = '/doctordashboard/appointment';
export const cancelAppointemntAndRemoveAvailability = async (availability_id) => {
  try {
    const {token} = JSON.parse(localStorage.getItem('User')) || '';
    const headers = token.length !==0 ? {
      Authorization : `Bearer ${token}`
    } : {};

    const res = await api.delete(`${CANCEL_APPOINTMENT_AND_REMOVE_AVAILABILITY_URL}/${availability_id}`,{
      headers
    })
    return res;
  } catch (error) {
    throw error;
  }
}

const GET_PATIENT_DETAILS_URL = '/doctordashboard/patient'
export const getPatientDetails = async (patient_id) => {
  try {
    const {token} = JSON.parse(localStorage.getItem('User')) || '';
    const headers = token.length !==0 ? {
      Authorization : `Bearer ${token}`
    } : {};
    const res = await api.get(`${GET_PATIENT_DETAILS_URL}/${patient_id}`,{headers});
    return res?.data;
  } catch (error) {
      throw error;
  }
}

const ADD_APPOINMENT_TO_COMPLETED_URL = '/doctordashboard/appointment';
export const addAppointmentToComplete = async (availability_id) => {
  try {
    const {token} = JSON.parse(localStorage.getItem('User')) || '';
    const headers = token.length !==0 ? {
      Authorization : `Bearer ${token}`
    } : {};
    const res = await api.patch(`${ADD_APPOINMENT_TO_COMPLETED_URL}/${availability_id}`,{},{headers});

    return res?.data;
  } catch (error) {
    throw error;
  }
}