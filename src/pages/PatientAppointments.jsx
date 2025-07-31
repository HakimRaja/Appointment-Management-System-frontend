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
    const [pageNumber,setPageNumber] = useState(1);
    const [appointmentsPerPage,setAppointmentsPerPage] = useState(4);
    const [isNextLoading,setIsNextLoading] = useState(false);
    const [check,setCheck] = useState(false);

    const handleNext = ()=>{
        setIsNextLoading(true);
        setPageNumber(prev => ++prev);
    }
    const handlePrev = ()=>{
        setPageNumber(prev => --prev);
    }
    const callGetAppointmentListFunc = async()=>{
        const toastId = toast.loading('Searching for appointments!');
        
        try {
            const payload = {pageNumber,appointmentsPerPage}
            if (!check) {            
            const res = await getAppointmentsList(payload);
            toast.dismiss(toastId);
            if (res?.finalAppointments.length === 0 && pageNumber !== 1) {
                setCheck(true);
                setPageNumber((prev=>--prev));
            }
            else{
                return setAppointmentInfo(res.finalAppointments);
            }
        }
        } catch (error) {
            const err = error?.response?.data?.message || 'Something Went Wrong';
            toast.error(err);
        }
        finally{
            setIsNextLoading(false);
            toast.dismiss(toastId);
            setCheck(false);
        }
    }
    useEffect(() => {
        (async () => {
            await callGetAppointmentListFunc();
        })();
    }, [render,pageNumber]);

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
        <>
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
                        <div className='font-semibold'>Date : {appointment?.date?.slice(0,10)}</div>
                        <div className='font-semibold'>Status : {appointment.status === 'cancelled' ? 
                                                                    <span className='text-red-600'>Cancelled by the doctor</span> 
                                                                        : 
                                                                    appointment.status === 'scheduled' ? 
                                                                        appointment.status 
                                                                            : 
                                                                        <span className='text-green-500'>{appointment.status}</span>}</div>
                        {appointment.status !== 'completed' && <button className='bg-yellow-400 hover:bg-yellow-500 transition ease-in-out text-white rounded-full p-2 w-full hover:scale-105' onClick={() => handleUpdateButton(appointment.doctor_id,appointment.name,appointment.appointment_id)}>Update Appointment</button>} {/*doctor_id is basically user_id from availability table */}
                        {appointment.status === 'scheduled' && <button className='bg-red-600 hover:bg-red-700 transition ease-in-out text-white rounded-full p-2 w-full hover:scale-105' onClick={() => handleDelete(appointment.appointment_id)}>Cancel Appointment</button>}
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
        <div className='w-full flex flex-row justify-between items-center border p-2 mb-2 bg-slate-300 rounded-full font-semibold text-white'>
                <div>
                    <button className='p-2 rounded-r rounded-full bg-gradient-to-r from-red-500 to-pink-500 hover:scale-105 hover:from-red-400 hover:to-pink-400 transition ease-in-out' disabled={pageNumber === 1} onClick={handlePrev}>Prev</button>
                </div>
                <div>
                    <span className='font-bold text-black'>Page : {isNextLoading ? pageNumber-1 : pageNumber}</span>
                </div>
                <div>
                    <button className='p-2 rounded-l rounded-full bg-gradient-to-r from-green-500 to-emerald-500 hover:scale-105 hover:from-green-400 hover:to-emerald-400 transition ease-in-out' disabled={isNextLoading || appointmentInfo?.length !== appointmentsPerPage} onClick={handleNext}>Next</button>
                </div>
            </div> 
        </>
  )
}

export default PatientAppointments;