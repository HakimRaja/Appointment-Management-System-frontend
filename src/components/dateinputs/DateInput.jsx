import React from 'react'
import { DatePicker } from 'antd'
import dayjs from 'dayjs';

const DateInput = ({label,required,name,value,onChange,format = 'YYYY-MM-DD' ,}) => {
  return (
    <div className='mb-4'>
        {label && (<label className='font-semibold mt-4'>{label}{required && (<span className='text-red-600'>*</span>)}</label>)}
        <DatePicker
        name = {name}
        value = {value ? dayjs(value):null}
        onChange={onChange}
        format={format}
        className='w-full'
        />
    </div>
  )
}

export default DateInput