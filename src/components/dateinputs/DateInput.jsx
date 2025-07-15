import React from 'react'
import { DatePicker } from 'antd'
import dayjs from 'dayjs';

const DateInput = ({label,required,name,value,onChange,format = 'YYYY-MM-DD' ,labelClass , datePickerClass}) => {
  return (
    <div className='my-4'>
        {label && (<label className={labelClass ? labelClass:('font-semibold mt-4')}>{label}{required && (<span className='text-red-800'>*</span>)}</label>)}
        <DatePicker
        name = {name}
        value = {value ? dayjs(value):null}
        onChange={onChange}
        format={format}
        className={datePickerClass ? datePickerClass:('w-full')}
        />
    </div>
  )
}

export default DateInput