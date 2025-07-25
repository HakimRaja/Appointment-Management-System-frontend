import React, { useContext, useEffect, useMemo, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import DateInput from '../components/dateinputs/DateInput';
import dayjs from 'dayjs';
import { deleteAvailabilitySlot, getAvailabilities } from '../services/doctor';
import { IoPersonCircle } from "react-icons/io5";
import { toast } from 'sonner';

const buttonClasses = {
    remove : 'p-2 m-2 bg-red-400 rounded-full hover:bg-red-500 hover:scale-105 transition ease-in-out',
    cancel : 'p-2 m-2 bg-red-500 rounded-full hover:bg-red-600 hover:scale-105 transition ease-in-out',
    update : 'p-2 m-2 bg-yellow-400 rounded-full hover:bg-yellow-500 hover:scale-105 transition ease-in-out',
    detail : 'p-2 m-2 bg-green-400 rounded-full hover:bg-green-500 hover:scale-105 transition ease-in-out'
}

const DoctorDashboard = () => {
  const {isAuthenticated,user} = useContext(AuthContext);
  const [selectedDate,setSelectedDate] = useState(null);
  const [availabilitiesInfo,setAvailabilitiesInfo] = useState(null);
  const [isLoading,setIsLoading] = useState();
  const [render,setRender] = useState(1);

  const disabledDateFunc = (current) =>{
    return current && current < dayjs().startOf('day')
  }

  /*
  USE MEMO FOR GETTING AVAILABILITIES AS PER THE DATE
  */
  const getAvailabilitiesByDateFunc = () =>{
    if (!availabilitiesInfo || availabilitiesInfo?.lenght == 0) {
      return [];
  }
  return availabilitiesInfo.filter((avail) => avail.date.slice(0,10) == selectedDate)
          .sort((a,b) => parseInt(a.start_time.slice(0,2) + a.start_time.slice(3,5)) - parseInt(b.start_time.slice(0,2) + b.start_time.slice(3,5)));
  }
  const getAvailabilitiesByDate = useMemo(() => {
      return getAvailabilitiesByDateFunc();
  }, [selectedDate,availabilitiesInfo]);

  
  const callGetAvailabilitiesFunc = async()=>{
    try {
      const res = await getAvailabilities();
      setAvailabilitiesInfo(res.availabilities)
    } catch (error) {
      err => console.log(err)
    }
  }

  useEffect(() => {
    (async () => await callGetAvailabilitiesFunc())(); 
  }, [])

  const handleRemove = async(availability_id)=>{
    setIsLoading({type : 'remove',availability_id})
    try {
      const res = await deleteAvailabilitySlot(availability_id);
      toast.success('Slot is deleted.');
      setAvailabilitiesInfo(prev => prev.filter(prev => prev.availability_id !== availability_id))
    } catch (error) {
      if (error?.response?.data?.message) {
        return toast.error(error?.response?.data?.message);
      }
      toast.error('Something went wrong!');
    }
    finally{
      setIsLoading(null);
    }
  }
  const removeConditionForButton = (availability_id)=>{
    return isLoading?.type === 'remove' && isLoading?.availability_id === availability_id;
  }
  return (
    <div className='min-h-screen my-3'>
        <div className='text-center text-lg font-extrabold'>Doctor Dashboard</div>
        <div className='bg-gradient-to-r from-slate-200 via-slate-300 to-slate-400 text-white p-2 text-center'>
            <div className='font-bold'>See Status Of Availabilities</div>
            <div className='flex justify-center'>
                <DateInput
                label={'Select Date To See Your Availabilities'}
                value={selectedDate}
                onChange={(date,dateString) => setSelectedDate(dateString)}
                disabledDateFunc={disabledDateFunc}
                />

            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2'>
                {selectedDate && getAvailabilitiesByDate?.length > 0 ? getAvailabilitiesByDate?.map((avail,index) => (<div key={index} className='m-1 text-l bg-slate-700'>
                <div className='space-y-4 text-left p-3'>
                    <h1>Start Time : {avail.start_time}</h1>
                    <h1>End Time   : {avail.end_time}</h1>
                    <h1>Status     : {avail?.status || <span>slot is free</span>}</h1>
                    {avail?.status ? <button className={buttonClasses.detail}>See Details</button>:<button className={buttonClasses.remove} onClick={() => removeConditionForButton(avail.availability_id) ? '':handleRemove(avail.availability_id)}>{removeConditionForButton(avail.availability_id) ? 'Removing Slot':'Remove Slot'}</button>}
                </div>
                </div>)): <div>No slots found ...</div>}
            </div>
        </div>
        
    </div>
  )
}

export default DoctorDashboard;