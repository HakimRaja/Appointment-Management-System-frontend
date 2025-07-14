import React from 'react'
import LoginForm from '../components/forms/LoginForm'

const LoginPage = () => {
  return (
    <div className='max-w-md mx-auto mt-10 p-4 border rounded shadow max-h-md'>
      <h2 className='text-2xl font-bold mb-4'>Log In</h2>
      <LoginForm/>
    </div>
  )
}

export default LoginPage