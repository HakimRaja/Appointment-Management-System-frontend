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
  const [render , setRender] = useState(1);
  const [pageNumber , setPageNumber] = useState(1);
  const [isNextSelected,setIsNextSelected] = useState(false);
  const [check,setCheck] = useState(false)

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
     setRender(prev => ++prev);
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

  const handleNext = ()=>{
    if (!isNextSelected) {
      setIsNextSelected(true);
      setPageNumber(prev => ++prev);
    }
  }
  const handlePrev = ()=>{
    if (pageNumber === 1) {
      return toast.warning('You are on first page .')
    }
    setPageNumber(prev => --prev);
  }
  const callGetDoctorsListFunc = async () => {
    const toastId = toast.loading('Searching for the doctors!');
    try {
      if (!check) {
      const res = await getDoctorsList(pageNumber);
      toast.dismiss(toastId);
      if (res.finalDoctors.length === 0 && pageNumber !== 1) {
        setCheck(true);
        toast.warning('You are on the last page!');  
        return setPageNumber(prev => --prev)
      }
      return setDoctorsInfo(res.finalDoctors);
    }
    toast.dismiss(toastId);
    setCheck(false);
    } catch (error) {
      console.log(error);
      setDoctorsInfoError(error?.response?.data?.message)
    }
    finally{
      setIsNextSelected(false);
    }
  }
  

  useEffect(() => {
    (async () => {
      await callGetDoctorsListFunc();
    })();
    
  }, [pageNumber]);
  
  return (
    <>
    <div className='m-3 min-h-screen '> <p className="text-center font-semibold text-lg w-full my-4">Book An Appointment</p>
        <div className='grid grid-cols-1 sm:grid-cols-2'>
            {doctorsInfo && doctorsInfo.map((doc,index) =>(
                <div className='border p-7 bg-gray-100 m-2 shadow space-y-2' key={index}>
                    <div className=" flex justify-center"><IoPersonCircle size={40}/></div>
                    <h5 className='font-bold'>Doc. {doc.name}</h5>
                    <h5 className='font-semibold'>Email : {doc.email}</h5>
                    <h5 className='font-semibold'>Phone : {doc.phone_number}</h5>  
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
            {(doctorsInfoError || doctorsInfo.length == 0) && <h5 className='text-center'>No Doctors Found</h5>}
        </div>
    </div>
    <div className="border p-2 mb-2 rounded-full bg-slate-300 flex flex-row justify-between items-center">
              <div>
                <button className="m-1 text-white font-semibold border rounded-r rounded-full p-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-400 hover:to-pink-400 hover:scale-105 transition ease-in-out" onClick={handlePrev} disabled={pageNumber === 1}>Prev</button>
              </div>
              <div>
                <span className="font-bold">Page : {isNextSelected ? pageNumber-1:pageNumber}</span>
              </div>
              <div>
                <button className="m-1 text-white font-semibold border rounded-l rounded-full p-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 hover:scale-105 transition ease-in-out" onClick={handleNext} disabled={isNextSelected || doctorsInfo.length !== 4}>Next</button>
              </div>
    </div>
    </>
  )
}

export default PatientDashboard