import React, { use, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { deleteAppointment, getAppointmentsList } from '../services/patient';

const PatientAppointments = () => {
    const {user} = useContext(AuthContext);
    const [appointmentInfo , setAppointmentInfo] = useState(null);
    const [listError,setListError] = useState(null);
    const [isListLengthZero,setIsListLengthZero] = useState(true);
    const [isDeleted,setIsDeleted] = useState(false);
    const [render , setRender] = useState(0);
    useEffect(() => {
        getAppointmentsList(user?.user_id, user?.token)
        .then(res => {
            setListError(false);
            if(!res) return setIsListLengthZero(true);
            setIsListLengthZero(false);
            setAppointmentInfo(res.finalAppointments);
        })
        .catch(err => {
            setListError(`Something went Wrong`)
        })
    }, [render]);

    const handleDelete = async(availability_id)=>{
        try {
            const res = await deleteAppointment(user?.token , availability_id);
            setIsDeleted(true);
            setRender(prev => ++prev);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='min-h-screen m-3'>
            <p className="text-center font-semibold text-lg w-full bg-gray-100 rounded-full mb-1">Appointments</p>
            {isDeleted && <p className="text-center font-semibold text-lg w-full bg-yellow-200 rounded-full" onClick={()=> setIsDeleted(false)}>Appointment Deleted Successfully</p>}
            {(!appointmentInfo || appointmentInfo?.length == 0) && <p className="text-center font-semibold text-lg w-full ">No Appointments</p>}
            <div className='grid grid-cols-1 sm:grid-cols-2'>
                {appointmentInfo && appointmentInfo?.length > 0 && appointmentInfo.map((appointment,index)=>(
                    <div className='bg-gray-100 space-y-2 border p-7 m-2' key={index}>
                        <div className='font-bold'>Doc. {appointment.name}</div>
                        <div className='font-semibold'>Email : {appointment.email}</div>
                        <h5 className='font-semibold'>Specializations : {appointment.specializations?.map((spec,index) => (<span key={index}> {spec} {index !== appointment.specializations.length-1 ? ', ':``}</span>))}</h5>
                        <div className='font-semibold'>Time : {appointment.start_time} - {appointment.end_time}</div>
                        <div className='font-semibold'>Date : {appointment.date.slice(0,10)}</div>
                        <div className='font-semibold'>Status : {appointment.status}</div>
                        <button className='bg-red-600 hover:bg-red-700 transition ease-in-out text-white rounded-full p-2 w-full hover:scale-105' onClick={() => handleDelete(appointment.appointment_id)}>Cancel Appointment</button>
                    </div>
                ))}

            </div>    
        </div>
  )
}

export default PatientAppointments;