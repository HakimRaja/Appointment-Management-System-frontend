import React, { useContext, useEffect } from 'react'
import LoginForm from '../components/forms/LoginForm'
import { AuthContext } from '../context/AuthContext'

const LoginPage = () => {
  const {clearLoginState} = useContext(AuthContext);
  useEffect(() => {
    clearLoginState();
  }, [])
  
  return (
    <div className='max-w-md mx-auto mt-10 p-4 border rounded shadow max-h-md'>
      <h2 className='text-2xl font-bold mb-4'>Log In</h2>
      <LoginForm/>
    </div>
  )
}

export default LoginPage