import React from 'react'
import SignupForm from '../components/forms/SignupForm'

const SignupPage = () => {
  return (
    <div className='max-w-md mx-auto mt-10 p-4 border rounded shadow max-h-md'>
      <h2 className='text-2xl font-bold mb-4'>Sign Up</h2>
      <SignupForm/>
    </div>
  )
}

export default SignupPage