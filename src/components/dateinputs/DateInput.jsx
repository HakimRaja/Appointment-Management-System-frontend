import React from 'react'
import { DatePicker } from 'antd'
import dayjs from 'dayjs';

const DateInput = ({label,required,name,value,onChange,format = 'YYYY-MM-DD' ,labelClass , datePickerClass, disabledDateFunc = false,nextLineText = false}) => {
  return (
    <div className='my-4'>
        {label && (!nextLineText ? (<label className={labelClass ? labelClass:('font-semibold mt-4')}>{label}{required && (<span className='text-red-800'>*</span>)}</label>)
                                      :
                                    (<label className={labelClass ? labelClass:('font-semibold mt-4')}>{label.slice(0,25)}{required && (<span className='text-red-800'>*</span>)} <br /> <span className='font-semibold '>{label.slice(25)}</span></label>))}
        <DatePicker
        name = {name}
        value = {value ? dayjs(value):null}
        onChange={onChange}
        format={format}
        className={datePickerClass ? datePickerClass:('w-full mt-1')}
        {...(disabledDateFunc ? {disabledDate : disabledDateFunc}:{})}
        />
    </div>
  )
}

export default DateInput