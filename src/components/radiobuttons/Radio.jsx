import React from 'react'

const Radio = ({label,required,name,onChange,array,labelClass,radioButtonsClass,type,checked}) => {
  return (
    <>
          <label className={labelClass ? labelClass:'font-semibold'}>{label}{required && <span className='text-red-800'>*</span>}</label>
          <div className={radioButtonsClass ? radioButtonsClass:'flex gap-4'}>
              {array.map((e)=>(
                <label key={e}>
                  <input type={type} name={name} value={e} checked={checked === e} onChange={onChange} />{e.toUpperCase()}
                </label>
              ))}
          </div>
    </>
  )
}

export default Radio