import React, { useState } from 'react'
import Select from 'react-select';

const PatientDashboardModal = ({doc,handleCloseModal,handleSelectButton}) => {
    const availOptions = doc.availabilities.map(avail => ({
        label : `${avail.start_time}-${avail.end_time} On ${avail.date}`,
        value : avail.availability_id
    }))
    const [selectedSlot,setSelectedSlot] = useState(null);
    return (
    <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50'>
        <div className='bg-white p-6 rounded-lg w-full max-w-md space-x-2'>
            <h1 className='font-semibold text-lg'>Doc. {doc?.name}</h1>
            <Select
            options={availOptions}
            value={selectedSlot}
            onChange={setSelectedSlot}
            placeholder='Select a Slot'
            />
        </div>
        <button className='bg-red-600 hover:bg-red-700 transition ease-in-out text-white rounded-full' onClick={handleCloseModal}>Close</button>
        <button className='bg-blue-600 hover:bg-blue-700 transition ease-in-out text-white rounded-full' onClick={handleCloseModal}>Confirm Booking</button>
    </div>
  )
}

export default PatientDashboardModal