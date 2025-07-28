import React, { use, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { deleteAppointment, getAppointmentsList, getAvailabilitiesForUpdate, updateAppointment } from '../services/patient';
import { toast } from 'sonner';
import PatientDashboardModal from '../components/modal/PatientDashboardModal';

const PatientAppointments = () => {
    const {user} = useContext(AuthContext);
    const [appointmentInfo , setAppointmentInfo] = useState(null);
    const [listError,setListError] = useState(null);
    const [isListLengthZero,setIsListLengthZero] = useState(true);
    const [isDeleted,setIsDeleted] = useState(false);
    const [isUpdated,setIsUpdated] = useState(false);
    const [render , setRender] = useState(0);
    const [isModalOpen , setIsModalOpen] = useState(false);
    const [availabilities ,setAvailabilities] = useState(null);
    const [error,setError] = useState(null);
    const [appointmentId,setAppointmentId] = useState(null);

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
        setIsUpdated(false);
        setIsDeleted(false);
        try {
            const res = await deleteAppointment(user?.token , availability_id);
            setIsDeleted(true);
            setRender(prev => ++prev);
        } catch (error) {
            console.log(error);
        }
    };
    
    const handleUpdateButton = async(doctor_id,doctorName,appointment_id)=>{
        setIsDeleted(false);
        setIsUpdated(false);
        setError(null);
        try {
            const res = await getAvailabilitiesForUpdate(user?.token , doctor_id);
            setAvailabilities({...res , name : doctorName});
            setAppointmentId(appointment_id)
        } catch (error) {
            console.log(error);
        }
    };
    const handleCloseModal = ()=>{
        setIsModalOpen(false);
        setAvailabilities(null);
    }
    const handleModalUpdateClick = async(slot)=>{
        if (!slot) {
            setError('Please select a slot');
        }

        try {
            const res = await updateAppointment(user?.token,appointmentId,slot?.value);
            setIsUpdated('Appointment Updated Successfuly');
            setIsModalOpen(false);
            setRender(prev => ++prev);
        } catch (error) {
            setError('Something went wrong!')
        }
    } 

    useEffect(() => {
        if (availabilities) {
            setIsModalOpen(true);
        }
    }, [availabilities])
    

    useEffect(() => {
      if (isDeleted) {
        toast.success('Appointment Cancelled Successfully');
      }
      if (error) {
        toast.error(error);
      }
      if (isUpdated) {
        toast.success(isUpdated);
      }
    }, [isDeleted,error,isUpdated])
    
    return (
        <div className='min-h-screen m-3'>
            <p className="text-center font-semibold text-lg w-full mb-1">Appointments</p>
            {(!appointmentInfo || appointmentInfo?.length == 0) && <p className="text-center font-semibold text-lg w-full ">No Appointments</p>}
            <div className='grid grid-cols-1 sm:grid-cols-2'>
                {appointmentInfo && appointmentInfo?.length > 0 && appointmentInfo.map((appointment,index)=>(
                    <div className='bg-gray-100 space-y-2 border p-7 m-2' key={index}>
                        <div className='font-bold'>Doc. {appointment.name}</div>
                        <div className='font-semibold'>Email : {appointment.email}</div>
                        <h5 className='font-semibold'>Specializations : {appointment.specializations?.map((spec,index) => (<span key={index}> {spec} {index !== appointment.specializations.length-1 ? ', ':``}</span>))}</h5>
                        <div className='font-semibold'>Time : {appointment.start_time} - {appointment.end_time}</div>
                        <div className='font-semibold'>Date : {appointment.date.slice(0,10)}</div>
                        <div className='font-semibold'>Status : {appointment.status === 'cancelled' ? <span className='text-red-600'>Cancelled by the doctor</span>:appointment.status}</div>
                        <button className='bg-yellow-400 hover:bg-yellow-500 transition ease-in-out text-white rounded-full p-2 w-full hover:scale-105' onClick={() => handleUpdateButton(appointment.doctor_id,appointment.name,appointment.appointment_id)}>Update Appointment</button> {/*doctor_id is basically user_id from availability table */}
                        {appointment.status !== 'cancelled' && <button className='bg-red-600 hover:bg-red-700 transition ease-in-out text-white rounded-full p-2 w-full hover:scale-105' onClick={() => handleDelete(appointment.appointment_id)}>Cancel Appointment</button>}
                    </div>
                ))}
                {isModalOpen && <PatientDashboardModal 
                    doc={availabilities}
                    handleCloseModal={handleCloseModal}
                    handleSelectButton={handleModalUpdateClick}
                    operation='Update'
                />}
            </div>    
        </div>
  )
}

export default PatientAppointments;