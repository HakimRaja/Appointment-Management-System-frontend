import React, { useContext, useEffect, useMemo, useState } from 'react'
import { addDoctorAvailabilities, getAllAvailabilities } from '../services/doctor';
import { AuthContext } from '../context/AuthContext';
import Button from '../components/buttons/Button';
import DateInput from '../components/dateinputs/DateInput';
import dayjs from 'dayjs';
import AvailabilitiesSelect from '../components/scrollbars/AvailabilitiesSelect';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const DoctorAvailabilities = () => {
  const navigate = useNavigate();
  
  const {user,isAuthenticated} = useContext(AuthContext);
  const [error,setError] = useState(null);
  const [success,setSuccess] = useState(null);
  const [render,setRender] = useState(1);
  const [selectedSlots,setSelectedSlots] = useState(null);
  const [selectedDate,setSelectedDate] = useState(null);
  const [availabilities,setAvailabilities] = useState(null);

  const handleDateChange = (date,dateString) => {
    setSelectedDate(dateString)
    setSelectedSlots(null);
}

  const disabledDateFunc = (current)=>{
    return current && current < dayjs().startOf('day')
  }
  
  /*
   FUNCTION FOR USE MEMO
   */
  const getStartTimeOfPostedAvailabilitiesFunc = ()=>{
      if (!selectedDate || !availabilities) {
        return []
    }
    return availabilities.filter(avail => avail.date.slice(0,10) == selectedDate)
    .map(avail => avail.start_time);
  }
  const getStartTimeOfPostedAvailabilities = useMemo(() => {
      return getStartTimeOfPostedAvailabilitiesFunc();
  }, [selectedDate])

  /*
   FUNCTION FOR USE EFFECT
   */
  const callGetAvailabilitiesFunc = async()=>{
    try {
      const res = await getAllAvailabilities();
      setAvailabilities(res.availabilities)
    } catch (error) {
      err => console.log(err)
    }
  }
  useEffect(() => {
    (async () => await callGetAvailabilitiesFunc())(); //IIFE
  }, [render])
  

  const handleSubmit = async(e) =>{
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!selectedDate) {
        return toast.error('Please Select Date.')
    }
    if (!selectedSlots || selectedSlots.length === 0) {
        return toast.error('No Slot Is Selected.')
    }
    const payload = ({selectedSlots,selectedDate});
    try {
        const res = await addDoctorAvailabilities(payload);
        setRender((prev) => prev++);
        toast.success('Successfully Added.');
        navigate('/doctor',{
          state: {
          date : selectedDate
        }});
    } catch (error) {
        toast.error('something went wrong.')
    }
    finally{
        setSelectedDate(null);
        setSelectedSlots(null);
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-r from-gray-100 via-slate-400 to-red-300'>
        <div>
            <div className='text-xl font-bold text-center p-2'>Add Availabilities</div>
            <div className='flex justify-center item-center mt-5'>
                <div className='border shadow p-7 max-w-96 min-w-96'>
                    <div className='font-bold text-xl'>Select Date and Availabilities</div>
                    <form onSubmit={handleSubmit}>
                        <DateInput
                        label='Choose Date'
                        onChange={handleDateChange}
                        value={selectedDate}
                        disabledDateFunc={disabledDateFunc}
                        />
                        {selectedDate ?<AvailabilitiesSelect
                        slotList={getStartTimeOfPostedAvailabilities}
                        selectedDate={selectedDate}
                        multiSelect={true}
                        value={selectedSlots}
                        onChange={(selectedOptions) => setSelectedSlots(selectedOptions || [])}
                        />:<div className='bg-white rounded p-1'>Please Select Date</div>}
                        <Button type='submit' >Submit</Button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DoctorAvailabilities;