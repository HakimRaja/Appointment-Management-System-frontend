import React, { useState } from 'react'
import { loginUser } from '../../services/authServices';
import { useNavigate } from 'react-router-dom';
import Input from '../input/Input';
import Button from '../buttons/Button';

const LoginForm = () => {
  const navigate = useNavigate(); 
  const [data,setData] = useState({
      email: '',
      password: ''
    });
    const handleChange = (e)=>{
      setData({...data ,[e.target.name] : e.target.value});
    }
  // console.log(data);
    const handleSubmit = async(e) =>{
      e.preventDefault();
      try {
        const res = await loginUser(data);
        // if (!res?.message) {
        //   throw error;
        // }
        
        localStorage.setItem('token',res?.token);
        localStorage.setItem('userInfo',JSON.stringify({
          userId : res?.userId,
          email : res?.email
        }));
        alert(res?.message);
        navigate('/');
      } catch (error) {
        alert(error?.message || 'Signup Failed');
      }
    }
    return (
      <form onSubmit={handleSubmit}>
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

        <Button type='submit'>SignUp</Button>
        <div className='text-red-400 mx-auto hover:underline hover:text-red-500 transition ease-in-out'><a href="http://localhost:5173/signup" >go to signup page</a></div>
      </form>
    )
}

export default LoginForm;