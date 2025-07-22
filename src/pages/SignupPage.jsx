import React, { useContext ,useEffect} from 'react'
import SignupForm from '../components/forms/SignupForm'
import { AuthContext } from '../context/AuthContext'

const SignupPage = () => {
  const {clearSignupState} = useContext(AuthContext);
  useEffect(() => {
    clearSignupState();
  }, [])
  
  return (
    <div className='flex items-center justify-center min-h-screen m-4'>
      <div className='bg-gray-100 border shadow p-7'>
      <h2 className='text-2xl font-bold mb-4 text-center'>Sign Up</h2>
      <SignupForm/>
      </div>
    </div>
  )
}

export default SignupPage