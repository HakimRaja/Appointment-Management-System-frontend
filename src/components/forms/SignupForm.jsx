import React, { useContext, useState } from 'react'
import Input from '../input/Input';
import Button from '../buttons/Button';
import DateInput from '../dateinputs/DateInput';
import SpecializationSelect from '../scrollbars/SpecializationSelect';
import { checkPhoneNumber } from '../../services/helper/authHelper';
import { AuthContext} from '../../context/AuthContext';
import {Link} from 'react-router-dom';

const SignupForm = () => {
  const {medicalSpecializations , signupInfo ,signupError,signupSuccess,isSignupLoading , signupUser,updateSignupInfo } = useContext(AuthContext);
  const handleChange = (e)=>{
    updateSignupInfo({...signupInfo , [e.target.name] : e.target.value})
  }

  return (
    <>
    <form onSubmit={signupUser}>
      <Input
        label='Name'
        type='text'
        name='name'
        placeholder='Name'
        value={signupInfo.name}
        onChange={handleChange}
        required={true}
        />
     
      <Input
        label='Email'
        type='email'
        name='email'
        placeholder='Email'
        value={signupInfo.email}
        onChange={handleChange}
        required={true}
        />
      <Input
        label='Password'
        type='password'
        name='password'
        placeholder='password'
        value={signupInfo.password}
        onChange={handleChange}
        required={true}
        />
      <Input
        label='Phone Number'
        type='text'
        name='phone'
        placeholder='03********* (11 digit phone number)'
        value={signupInfo.phone}
        onChange={handleChange}
        required={true}
        />
    <DateInput
    label = 'Date of Birth'
    required={true}
    name='dob'
    onChange={(date,dateString) => updateSignupInfo({...signupInfo,dob:dateString})}
    value={signupInfo.dob}
    />
          
      <label className='font-semibold '>Select Role</label>
      <div className='flex gap-4'>
          {['admin','doctor','patient'].map((role)=>(
            <label key={role}>
              <input type="radio" name='role' value={role} checked={signupInfo.role === role} onChange={handleChange} />{role}
            </label>
          ))}
      </div>

      {signupInfo.role === 'doctor' && (
        <>
      <DateInput
    label = 'Experience'
    required={true}
    name='experience'
    onChange={(date,dateString) => updateSignupInfo({...signupInfo,experience:dateString})}
    value={signupInfo.experience}
    />
    <SpecializationSelect
    label='Specialization'
    required={true}
    name='specialization_id'
    value={signupInfo.specialization_id}
    onChange={handleChange}
    list={medicalSpecializations}
    />
      </>
      
      )}
      {signupInfo.role === 'patient' && (
        <Input
        label='Patient History'
        type='text'
        name='history'
        placeholder='Write your disease history'
        value={signupInfo.history}
        onChange={handleChange}
        required={true}
        />
      )}

      <Button type='submit' >{isSignupLoading ? 'Creating New User':'SignUp'}</Button>
      <div className='text-red-400 mx-auto hover:underline hover:text-red-500 transition ease-in-out'><Link to='/login'>Go to login page</Link></div>
    </form>
    {signupSuccess && (<span className='bg-green-300'>Sign up Successfull</span>)}
    {signupError && (<span className='bg-red-300'>{signupError}</span>)}
    </>
  )
}

export default SignupForm