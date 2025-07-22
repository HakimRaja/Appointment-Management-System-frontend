import React, { useContext, useEffect } from 'react'
import LoginForm from '../components/forms/LoginForm'
import { AuthContext } from '../context/AuthContext'

const LoginPage = () => {
  const {clearLoginState} = useContext(AuthContext);
  useEffect(() => {
    clearLoginState();
  }, [])
  
  return (
    <div className='min-h-screen flex items-center justify-center '>
      <div className='border p-7 bg-gray-100 shadow'>
      <h2 className='text-2xl font-bold mb-4'>Log In</h2>
      <LoginForm/>
      </div>
    </div>
  )
}

export default LoginPage