import { IoPersonCircle } from "react-icons/io5";
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getDoctorsList } from '../services/patientDashboard';


const PatientDashboard = () => { // now i have to integrate the backend in comming data
  const {user} = useContext(AuthContext);
  const [doctorsInfo,setDoctorsInfo] = useState([]);
  const [doctorsInfoError,setDoctorsInfoError] = useState(null);
  const [isModalOpen,setIsModalOpen] = useState(false);

  const handleBookClick = () =>{
    setIsModalOpen(true);
    
  };
  const handleCloseModal = ()=>{
    setIsModalOpen(false);
  }
  const handleSelectButton = ()=>{
    
  }
  
  useEffect(() => {
    getDoctorsList(user.token)
    .then(res => setDoctorsInfo(res.finalDoctors))
    .catch(error => {
        console.log(error);
        setDoctorsInfoError(error?.response?.data?.message)
    });  
    
  }, []);
  
  return (
    <div className='m-3 min-h-screen '>
        <div className='grid grid-cols-1 sm:grid-cols-2'>
            {doctorsInfo && doctorsInfo.map((doc,index) =>(
                <div className='border p-7 bg-gray-100 m-2 shadow space-y-2' key={index}>
                    <div className=" flex justify-center"><IoPersonCircle size={40}/></div>
                    <h5 className='font-bold'>Doc. {doc.name}</h5>
                    <h5 className='font-semibold'>Email : {doc.email}</h5>
                    <h5 className='font-semibold'>Phone : {doc.phone}</h5>  
                    <h5 className='font-semibold'>Specializations : {doc.specializations?.map((spec,index) => (<span key={index}> {spec} {index !== doc.specializations.length-1 ? ', ':``}</span>))}</h5>
                    <h5 className='font-semibold'>Experience : {<span>{doc?.experience[0]>=1 ? `${doc?.experience[0]} year and`:''} {doc?.experience[1]} months</span>}</h5>
                    <button onClick={handleBookClick} className='w-full my-4 p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 hover:scale-105 transition ease-in-out'>Book an Appointment</button>
                </div>
            ))}
            {/* {isModalOpen && } */}
            {(doctorsInfoError || doctorsInfo.length == 0) && <h5 className='text-center'>No Doctors Found</h5>}
        </div>
    </div>
  )
}

export default PatientDashboard