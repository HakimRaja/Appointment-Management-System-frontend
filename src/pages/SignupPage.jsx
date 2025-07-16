import React, { useContext ,useEffect} from 'react'
import SignupForm from '../components/forms/SignupForm'
import { AuthContext } from '../context/AuthContext'

const SignupPage = () => {
  const {clearSignupState} = useContext(AuthContext);
  useEffect(() => {
    clearSignupState();
  }, [])
  
  return (
    <div className='max-w-md mx-auto mt-10 p-4 border rounded shadow max-h-md'>
      <h2 className='text-2xl font-bold mb-4 text-center'>Sign Up</h2>
      <SignupForm/>
    </div>
  )
}

export default SignupPage