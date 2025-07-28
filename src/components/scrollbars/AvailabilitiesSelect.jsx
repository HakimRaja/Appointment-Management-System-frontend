import React, { useState } from 'react'
import { timeSlots } from '../../constants/doctorTimeSlots'
import Select from 'react-select'

const AvailabilitiesSelect = ({label,labelClass,selectClass,slotList,multiSelect,value,onChange,selectedDate}) => {
  const [today,setToday] = useState(new Date());
  
  const [todaysDate,setTodaysDate] = useState(today.toLocaleDateString('en-CA',{
    timeZone : 'Asia/Karachi'
    }));

  const [timeRightNow,setTimeRightNow] = useState(today.toLocaleTimeString('en-GB',{
    timeZone : 'Asia/Karachi',
    hour12  :false
    }));


  const check = () => {
    return todaysDate == selectedDate;
  };


  const timeDifference = (start_time)=>{
    return ((parseInt(`${timeRightNow.slice(0,2)}${timeRightNow.slice(3,5)}${timeRightNow.slice(6)}`)) > (parseInt(`${start_time.slice(0,2)}${start_time.slice(3,5)}${start_time.slice(6)}`)));
  }

  const getOptions = () => {
    return timeSlots.map((slot,index) => ({isDisabled : (slotList.includes(slot.start_time) || (check() && timeDifference(slot.start_time))),
      label : slot.label,
      value : {start_time : slot.start_time, end_time : slot.end_time}
    }));
  }

  const options = getOptions();

  return (
    <div>
        {label && <div className={labelClass || 'font-semibold'}>{label}</div>}
        <Select
        options={options}
        isMulti = {multiSelect}
        onChange={onChange}
        value={value}
        className={selectClass || 'w-full'}
        getOptionValue={(e) => `${e.value.start_time}-${e.value.end_time}`}
        />
    </div>
  )
}

export default AvailabilitiesSelect