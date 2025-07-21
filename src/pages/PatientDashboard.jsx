import { IoPersonCircle } from "react-icons/io5";
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { bookAppointment, getDoctorsList } from '../services/patient';
import PatientDashboardModal from "../components/modal/PatientDashboardModal";
import { toast } from "sonner";


const PatientDashboard = () => { // now i have to integrate the backend in comming data
  const {user} = useContext(AuthContext);
  const [doctorsInfo,setDoctorsInfo] = useState([]);
  const [doctorsInfoError,setDoctorsInfoError] = useState(null);
  const [isModalOpen,setIsModalOpen] = useState(false);
  const [selectedDoctor , setSelectedDoctor] = useState(null);
  const [error,setError] = useState(null);
  const [success,setSuccess] = useState(null);

  const handleBookClick = (doc) =>{
    setSelectedDoctor(doc);
    setError(null);
    setSuccess(null);
    setIsModalOpen(true);
  };
  const handleCloseModal = ()=>{
    setIsModalOpen(false);
    setSelectedDoctor(null);
  }
  const handleSelectButton = async(slot)=>{
    setError(null);
    setSuccess(null);
    if (!slot) {
      console.log('please select a Slot')
      return setError(`please select a Slot.`);
    }
    try {
     const res = await bookAppointment(user?.token , slot?.value);
     setDoctorsInfo(prev => prev.map(doc => {
      if(doc.user_id === selectedDoctor.user_id) return ({...doc,availabilities : doc.availabilities.filter(avail => avail.availability_id !== slot.value)})
      return doc;
      })) 
     setSuccess('Slot booked successfully.');
     handleCloseModal();
    } catch (error) {
      return setError(error?.response?.data?.message || error?.message || error);
    } 
  }
  useEffect(() => {
    if (success) {
      toast.success(success);
    }
    if (error) {
      toast.error(error)
    }
  }, [success,error])
  
  
  useEffect(() => {
    getDoctorsList(user.token)
    .then(res => setDoctorsInfo(res.finalDoctors))
    .catch(error => {
        console.log(error);
        setDoctorsInfoError(error?.response?.data?.message)
    });  
    
  }, []);
  
  return (
    <div className='m-3 min-h-screen '> <p className="text-center font-semibold text-lg w-full bg-gray-100 rounded-full">Book An Appointment</p>
        <div className='grid grid-cols-1 sm:grid-cols-2'>
            {doctorsInfo && doctorsInfo.map((doc,index) =>(
                <div className='border p-7 bg-gray-100 m-2 shadow space-y-2' key={index}>
                    <div className=" flex justify-center"><IoPersonCircle size={40}/></div>
                    <h5 className='font-bold'>Doc. {doc.name}</h5>
                    <h5 className='font-semibold'>Email : {doc.email}</h5>
                    <h5 className='font-semibold'>Phone : {doc.phone}</h5>  
                    <h5 className='font-semibold'>Specializations : {doc.specializations?.map((spec,index) => (<span key={index}> {spec} {index !== doc.specializations.length-1 ? ', ':``}</span>))}</h5>
                    <h5 className='font-semibold'>Experience : {doc?.experience}</h5>
                    <button onClick={() => handleBookClick(doc)} className='w-full my-4 p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 hover:scale-105 transition ease-in-out'>Book an Appointment</button>
                </div>
            ))}
            {isModalOpen && <PatientDashboardModal
            doc={selectedDoctor}
            handleCloseModal={handleCloseModal}
            handleSelectButton={handleSelectButton}
            error={error}
            success={success}
            />}
            {(doctorsInfoError || doctorsInfo == null) && <h5 className='text-center'>No Doctors Found</h5>}
        </div>
    </div>
  )
}

export default PatientDashboard