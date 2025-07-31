import React, { useContext, useEffect, useMemo, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import DateInput from '../components/dateinputs/DateInput';
import dayjs from 'dayjs';
import { addAppointmentToComplete, cancelAppointemntAndRemoveAvailability, deleteAvailabilitySlot, getAvailabilities, getPatientDetails } from '../services/doctor';
import { IoPersonCircle } from "react-icons/io5";
import { toast } from 'sonner';
import PatientDetailModal from '../components/modal/PatientDetailModal';
import { checkTodaysDate } from '../utils/doctorHelper';
import { useLocation } from 'react-router-dom';

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
  const [patientDetailModal , setPatientDetailModal] = useState(false);
  const [patientDetails,setPatientDetails] = useState(null);
  const [isSelectedDateToday,setIsSelectedDateToday] = useState({check : false , timeRightNow : null});
  // const [isNextLoading,setIsNextLoading] = useState(false);
  // const [pageNumber,setPageNumber] = useState(1);
  // const [slotsPerPage,setSlotsPerPage] = useState(6);

  const location = useLocation();
  const passedState = location.state;
  useEffect(() => {
    if (passedState?.date) {
      setSelectedDate(passedState.date);
    }
  }, [])
  
  // const handleNext = () =>{
  //   isNextLoading(true);
  //   setPageNumber(prev => ++prev)
  // }
  // const handlePrev =()=>{
  //   setPageNumber(prev => --prev);
  // }

  const disabledDateFunc = (current) =>{
    return current && current < dayjs().startOf('day')
  }

  const checkDateCondition = (start_time)=>{
    return isSelectedDateToday.timeRightNow && (parseInt(isSelectedDateToday.timeRightNow.slice(0,2) + isSelectedDateToday.timeRightNow.slice(3,5)) > parseInt(start_time.slice(0,2) + start_time.slice(3,5)));
  }

  useEffect(() => { 
  const timeRightNow = checkTodaysDate(selectedDate);
  if (timeRightNow) {
    setIsSelectedDateToday({check : true , timeRightNow});
  }
  else{
    setIsSelectedDateToday({check : false , timeRightNow : null});
  }
  }, [selectedDate])
  
  /*
  USE MEMO FOR GETTING AVAILABILITIES AS PER THE DATE
  */
 const filterConditionForUseMemo = (start_time)=>{
  const timeRightNow = checkTodaysDate(selectedDate);
  if (timeRightNow) {
    return (parseInt(timeRightNow.slice(0,2) + timeRightNow.slice(3,5)) > parseInt(start_time.slice(0,2) + start_time.slice(3,5)));
  }
  return false;
 }
  const getAvailabilitiesByDateFunc = () =>{
    if (!availabilitiesInfo || availabilitiesInfo?.lenght == 0) {
      return [];
  }
  return availabilitiesInfo.filter((avail) => {return avail.date.slice(0,10) == selectedDate && (!filterConditionForUseMemo(avail.start_time) || avail?.status)})
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
  }, [render])

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

  const handleCancel = async (availability_id) => {
    setIsLoading({type : 'cancel',availability_id});
    try {
      const res = await cancelAppointemntAndRemoveAvailability(availability_id);
      toast.success('Appointment is cancelled and slot is removed.');
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
  
  const cancelConditionForButton = (availability_id)=>{
    return isLoading?.type === 'cancel' && isLoading?.availability_id === availability_id;
  }

  const handleSeeDetails = async (patient_id,availability_id) => {
    setIsLoading({type : 'details',availability_id});
    const toastId = toast.loading('Loading patient Details ...');
    try {
      const res = await getPatientDetails(patient_id);
      toast.dismiss(toastId);
      setPatientDetails(res.patientDetails);
      setPatientDetailModal(true);
    } catch (error) {
      const err = error?.res?.data?.message || 'Something Went Wrong!';
      toast.dismiss(toastId);
      toast.error(err);
    }
    finally{
      setIsLoading(null);
    }
  }
  const seeDetailsConditionForButton = (availability_id) =>{
    return isLoading?.type === 'seeDetails' && availability_id === isLoading?.availability_id;
  }

  const handleOnClose = ()=>{
    setPatientDetailModal(false);
    setPatientDetails(null);
  }

  const handleCompleted = async(availability_id)=>{
    setIsLoading({type : 'completed',availability_id});
    const toastId = toast.loading('Updating the status ...')
    try {
      const res = await addAppointmentToComplete(availability_id);
      toast.dismiss(toastId);
      toast.success('Added Successfully!');
      setRender(prev => ++prev);
    } catch (error) {
      const err = error?.response?.data?.message || 'Something Went Wrong!';
      toast.dismiss(toastId);
      toast.error(err);
    }
    finally{
      setIsLoading(false);
    }
  }
  return (
    <div className='my-3'>
        <div className='text-center text-lg font-extrabold'>Doctor Dashboard</div>
        <div className='bg-gradient-to-r from-slate-200 via-slate-300 to-slate-400 text-white p-2 text-center min-h-screen'>
            <div className='font-bold'>See Status Of Availabilities</div>
            <div className='flex justify-center'>
                <DateInput
                label={'Select Date To See And Update Your Availabilities'}
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
                    <h1>Status     : {avail?.status || <span>free</span>}</h1>
                    {avail?.status == 'scheduled' &&
                      <>
                        <button className={buttonClasses.detail} onClick={() => seeDetailsConditionForButton(avail.availability_id) || handleSeeDetails(avail.patient_id,avail.availability_id)}>{seeDetailsConditionForButton(avail.availability_id) ? 'Opening Details':'See Details'}</button>
                        { checkDateCondition(avail.end_time) ? 
                        <button className={buttonClasses.update} onClick={() => handleCompleted(avail.availability_id)}>Mark as completed</button>
                          :
                        <button className={buttonClasses.cancel} onClick={() => cancelConditionForButton(avail.availability_id) || handleCancel(avail.availability_id)}>{cancelConditionForButton(avail.availability_id) ? 'Cancelling':'Cancel Appointment'}</button>
                    }</>}
                      
                        {avail?.status == 'completed' && 
                          <button className={buttonClasses.detail} onClick={() => seeDetailsConditionForButton(avail.availability_id) || handleSeeDetails(avail.patient_id,avail.availability_id)}>{seeDetailsConditionForButton(avail.availability_id) ? 'Opening Details':'See Details'}</button>}
                            
                          {!avail.status && 
                          <button className={buttonClasses.remove} onClick={() => removeConditionForButton(avail.availability_id) || handleRemove(avail.availability_id)}>{removeConditionForButton(avail.availability_id) ? 'Removing Slot':'Remove Slot'}</button>}
                    
                </div>
                </div>)): <div className='text-black'>{selectedDate ? 'No slots found ...':'Select Date ...'}</div>}
            </div>
            {patientDetailModal && <PatientDetailModal
              handleOnClose={handleOnClose}
              patient={patientDetails}
            />}
        </div>
        {/* {
        // selectedDate && 
        <div className='flex flex-row justify-between p-2 bg-slate-300 rounded-full text-white mt-3'>
              <div>
                    <button className='p-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-r rounded-full hover:scale-105 hover:from-red-400 hover:to-pink-400 transition ease-in-out' disabled={pageNumber === 1} onClick={handlePrev}>Prev</button>
              </div>
              <div className='text-black font-semibold p-2'>
                    Page : {isNextLoading ? pageNumber - 1 : pageNumber}
              </div>
              <div>
                    <button className='p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-l rounded-full hover:scale-105 hover:from-green-400 hover:to-emerald-400 transition ease-in-out' disabled={availabilitiesInfo?.length !== slotsPerPage} onClick={handleNext}>Next</button>
              </div>
        </div>} */}
    </div>
  )
}

export default DoctorDashboard;