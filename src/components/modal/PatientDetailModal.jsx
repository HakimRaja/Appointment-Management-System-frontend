import React from 'react'

const PatientDetailModal = ({handleOnClose,patient}) => {
  return (
    <div className='inset-0 z-50 bg-black bg-opacity-75 fixed flex justify-center items-center'>
        <div className='bg-white p-6 space-y-2 font-semibold text-lg text-black text-left'>
            <div className='text-right'><span className='p-1 bg-blue-500 rounded-full w-min hover:bg-blue-600 hover:scale-105 cursor-pointer transition ease-in-out' onClick={handleOnClose}>X</span></div>
            <h1>Name : {patient?.name}</h1>
            <h1>Email : {patient?.email}</h1>
            <h1>Phone : {patient?.phone_number}</h1>
            <h1>History : {patient?.history}</h1>
            <button onClick={handleOnClose} className='bg-blue-500 hover:bg-blue-600 hover:scale-105 transition ease-in-out w-full rounded-full p-2 text-white font-light'>Close</button>
        </div>
    </div>
  )
}

export default PatientDetailModal