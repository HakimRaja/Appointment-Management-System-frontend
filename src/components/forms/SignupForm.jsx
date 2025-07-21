import React, { useContext, useState } from 'react'
import Input from '../input/Input';
import Button from '../buttons/Button';
import DateInput from '../dateinputs/DateInput';
import SpecializationSelect from '../scrollbars/SpecializationSelect';
import { AuthContext} from '../../context/AuthContext';
import {Link} from 'react-router-dom';
import { SIGNUP_FIELDS } from '../../constants/signupFields';
import Radio from '../radiobuttons/Radio';

const SignupForm = () => {
  const {medicalSpecializations , signupInfo ,signupError,signupSuccess,isSignupLoading , signupUser,updateSignupInfo } = useContext(AuthContext);
  const handleChange = (e)=>{
    if (e.target.multiple) {
      const selectedSpecializations = Array.from(e.target.selectedOptions).map(option => option.value);
      updateSignupInfo({...signupInfo , [e.target.name] : selectedSpecializations})
    }
    else{
      updateSignupInfo({...signupInfo , [e.target.name] : e.target.value})
    }
  }

  return (
    <>
    <form onSubmit={signupUser}>
      <Input
        {...SIGNUP_FIELDS.name}
        value={signupInfo.name}
        onChange={handleChange}
        />
     
      <Input
        {...SIGNUP_FIELDS.email}
        value={signupInfo.email}
        onChange={handleChange}
        />
      <Input
        {...SIGNUP_FIELDS.password}
        value={signupInfo.password}
        onChange={handleChange}
        />
      <Input
        {...SIGNUP_FIELDS.phone}
        value={signupInfo.phone}
        onChange={handleChange}
        />
    <DateInput
    {...SIGNUP_FIELDS.dob}
    onChange={(date,dateString) => updateSignupInfo({...signupInfo,dob:dateString})}
    value={signupInfo.dob}
    />

      <Radio
        {...SIGNUP_FIELDS.roleSelect}
        array={SIGNUP_FIELDS.roles}
        checked={signupInfo.role}
        onChange={handleChange}
      />
      

      {signupInfo.role === 'doctor' && (
        <>
      <DateInput
    {...SIGNUP_FIELDS.experience}
    onChange={(date,dateString) => updateSignupInfo({...signupInfo,experience:dateString})}
    value={signupInfo.experience}
    />
    <SpecializationSelect
    {...SIGNUP_FIELDS.specialization}
    value={signupInfo.specialization}
    onChange={(selectedOptions) =>{
        selectedOptions = selectedOptions || [];
        updateSignupInfo({...signupInfo,specialization : selectedOptions})
    }}
    list={medicalSpecializations}
    />
      </>
      
      )}
      {signupInfo.role === 'patient' && (
        <Input
        {...SIGNUP_FIELDS.history}
        value={signupInfo.history}
        onChange={handleChange}
        />
      )}

      <Button type='submit' >{isSignupLoading ? 'Creating New User':'SignUp'}</Button>
      <div className='text-red-400 mx-auto hover:underline hover:text-red-500 transition ease-in-out'><Link to='/login'>Go To Login Page</Link></div>
    </form>
    {signupSuccess && (<span className='bg-green-300'>Sign up Successfull</span>)}
    {signupError && (<span className='bg-red-300'>{signupError}</span>)}
    </>
  )
}

export default SignupForm