import React from 'react'

const Input = ({label,type,placeholder,name,value,required,onChange}) => {
  return (
    <div className='mb-4'>
        {label && <label className='font-semibold'>{label}{required && <span className='text-red-800'>*</span>}</label>}
        <input type={type} 
        placeholder={placeholder}
        name={name}
        value={value}
        required={required}
        onChange={onChange} className='w-full border p-2'/>
    </div>
  )
}

export default Input;