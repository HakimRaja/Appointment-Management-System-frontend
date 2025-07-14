import React from 'react'

const SpecializationSelect = ({label,name,list,value,onChange,required}) => {
  return (
    <div className='mt-4'>
        {label && (<label>{label}{required && (<span className='text-red-600'>*</span>)}</label>)}
        <br />
        <select 
        id={name}
        name={name} 
        value={value}
        onChange={onChange}
        className='w-full'>
            <option value="" disabled>-- Choose a specialization --</option>
            {
                list.map((speciality,index)=>{
                    return <option key={index} value={speciality} >{speciality}</option>
                })
            }
        </select>
    </div>
  )
}

export default SpecializationSelect