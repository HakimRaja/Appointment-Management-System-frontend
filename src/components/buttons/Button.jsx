import React from 'react'

const Button = ({type,children,onSubmit}) => {
  return (
        <button type={type}
        onSubmit={onSubmit}
        className='w-full bg-blue-600 rounded-xl p-2 hover:scale-105 text-white my-4 hover:bg-blue-700 transition ease-in-out'>{children}</button>
  )
}

export default Button