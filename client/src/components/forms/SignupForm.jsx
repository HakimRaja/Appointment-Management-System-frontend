import React, { useState } from 'react'
import { signupUser } from '../../services/authServices';
import Input from '../input/Input';
import Button from '../buttons/Button';
import DateInput from '../dateinputs/DateInput';
import SpecializationSelect from '../scrollbars/SpecializationSelect';
import { checkPhoneNumber } from '../../services/helper/authHelper';

const SignupForm = () => {
  const [data,setData] = useState({
    name : '',
    email: '',
    password: '',
    phone: '',
    dob: '',
    role: 'admin',
    specialization: '',
    experience: '',
    history: ''
  });
  const medicalSpecializations = [
    "Allergy and Immunology",
    "Anesthesiology",
    "Cardiology",
    "Cardiothoracic Surgery",
    "Colon and Rectal Surgery",
    "Dermatology",
    "Emergency Medicine",
    "Endocrinology, Diabetes & Metabolism",
    "Family Medicine",
    "Gastroenterology",
    "General Surgery",
    "Geriatric Medicine",
    "Hematology",
    "Infectious Disease",
    "Internal Medicine",
    "Nephrology",
    "Neurology",
    "Neurosurgery",
    "Nuclear Medicine",
    "Obstetrics and Gynecology (OB/GYN)",
    "Oncology",
    "Ophthalmology",
    "Orthopedic Surgery",
    "Otolaryngology (ENT)",
    "Pathology",
    "Pediatrics",
    "Physical Medicine and Rehabilitation (Physiatry)",
    "Plastic Surgery",
    "Preventive Medicine",
    "Psychiatry",
    "Pulmonology",
    "Radiation Oncology",
    "Radiology (Diagnostic)",
    "Rheumatology",
    "Sleep Medicine",
    "Sports Medicine",
    "Urology",
    "Vascular Surgery",
]; //dynamic right now , will call via api
  const handleChange = (e)=>{
    setData({...data ,[e.target.name] : e.target.value}); 
  }
  // console.log(data);
  const handleSubmit = async(e) =>{
    e.preventDefault();
    if (!checkPhoneNumber(data.phone)) {
      return alert('please provide correct phone number!');
    }
    try {
      const res = await signupUser(data);
      alert(res.message);
    } catch (error) {
      alert(error?.message || 'Signup Failed');
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <Input
        label='Name'
        type='text'
        name='name'
        placeholder='Name'
        value={data.name}
        onChange={handleChange}
        required={true}
        />
     
      <Input
        label='Email'
        type='email'
        name='email'
        placeholder='Email'
        value={data.email}
        onChange={handleChange}
        required={true}
        />
      <Input
        label='Password'
        type='password'
        name='password'
        placeholder='password'
        value={data.password}
        onChange={handleChange}
        required={true}
        />
      <Input
        label='Phone Number'
        type='text'
        name='phone'
        placeholder='03********* (11 digit phone number)'
        value={data.phone}
        onChange={handleChange}
        required={true}
        />
    <DateInput
    label = 'Date of Birth'
    required={true}
    name='dob'
    onChange={(date,dateString) => setData({...data,dob:dateString})}
    value={data.dob}
    />
      
      {/* <input type="text" name='dob' placeholder='YYYY-MM-DD' value={data.dob} onChange={handleChange} className='w-full border p-2 mb-4' required={true} /> */}
      
      <label className='font-semibold '>Select Role</label>
      <div className='flex gap-4'>
          {['admin','doctor','patient'].map((role)=>(
            <label key={role}>
              <input type="radio" name='role' value={role} checked={data.role === role} onChange={handleChange} />{role}
            </label>
          ))}
      </div>

      {data.role === 'doctor' && (
        <>
      <DateInput
    label = 'Experience'
    required={true}
    name='experience'
    onChange={(date,dateString) => setData({...data,experience:dateString})}
    value={data.experience}
    />
    <SpecializationSelect
    label='Specialization'
    required={true}
    name='specialization'
    value={data.specialization}
    onChange={handleChange}
    list={medicalSpecializations}
    />
      </>
      
      )}
      {data.role === 'patient' && (
        <Input
        label='Patient History'
        type='text'
        name='history'
        placeholder='Write your disease history'
        value={data.history}
        onChange={handleChange}
        required={true}
        />
      )}

      <Button type='submit' >SignUp</Button>
      <div className='text-red-400 mx-auto hover:underline hover:text-red-500 transition ease-in-out'><a href="http://localhost:5173/login" >go to login page</a></div>
    </form>
  )
}

export default SignupForm