import React, { useEffect, useMemo, useState } from 'react'
import Select from 'react-select';
import DateInput from '../dateinputs/DateInput';
import dayjs from 'dayjs';

const PatientDashboardModal = ({doc,handleCloseModal,handleSelectButton,error,success}) => {
    const [selectedSlot,setSelectedSlot] = useState(null);
    const [selectedDate,setSelectedDate] = useState(null);
    const availOptions = useMemo(()=>{
        if (!selectedDate || !doc?.availabilities) {
            return [];
        }
        return doc.availabilities.filter((avail) => avail.date.slice(0,10) === selectedDate)
        .map((avail) => ({label : `${avail.start_time}-${avail.end_time}`,
                value : avail.availability_id}));
    },[selectedDate,doc?.availabilities]);

    const disabledDateFunc = (current) =>{
        return current && current < dayjs().startOf('day')
    }

    useEffect(() => {
      setSelectedSlot(null);
    }, [selectedDate])
    
    
    return (
    <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 z-50'>
        <div className='bg-white p-6 rounded-lg w-full max-w-md space-x-2 space-y-2'>
            <h1 className='font-semibold text-lg'>Doc. {doc?.name}</h1>
            <DateInput
            Label = 'Select Date'
            required={true}
            value={selectedDate}
            onChange={(date,dateString) => setSelectedDate(dateString)}
            disabledDateFunc={disabledDateFunc}
            />
            {availOptions && availOptions.length !== 0 ? <Select
            options={availOptions}
            value={selectedSlot}
            onChange={setSelectedSlot}
            placeholder='Select a Slot'
            /> : <p className='w-full border'>No Slot Found</p>}
            <button className='bg-red-600 hover:bg-red-700 transition ease-in-out text-white rounded-full p-2' onClick={handleCloseModal}>Close</button>
            <button className='bg-blue-600 hover:bg-blue-700 transition ease-in-out text-white rounded-full p-2' onClick={()=>handleSelectButton(selectedSlot)}>Confirm Booking</button>
            {/* {error && (<p className='bg-red-400'>{error}</p>)}
            {success && (<p className='bg-green-400'>{success}</p>)} */}
        </div>
    </div>
  )
}

export default PatientDashboardModal;