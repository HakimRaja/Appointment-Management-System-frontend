import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../input/Input';
import Button from '../buttons/Button';
import { AuthContext} from '../../context/AuthContext';

const LoginForm = () => {
  const {loginInfo ,loginError,loginSuccess,isLoginLoading , loginUser,updateLoginInfo } = useContext(AuthContext)
  const navigate = useNavigate(); 
  const [data,setData] = useState({
      email: '',
      password: ''
    });
    const handleChange = (e)=>{
      updateLoginInfo({...loginInfo ,[e.target.name] : e.target.value});
    }
  // console.log(data);
    
    return (
      <>
      <form onSubmit={loginUser}>
        <Input
        label='Email'
        type='email'
        name='email'
        placeholder='Email'
        value={loginInfo.email}
        onChange={handleChange}
        required={true}
        />

        <Input
        label='Password'
        type='password'
        name='password'
        placeholder='password'
        value={loginInfo.password}
        onChange={handleChange}
        required={true}
        />

        <Button type='submit'>{isLoginLoading ? 'Logging into your account' : 'Login'}</Button>
        <div className='text-red-400 mx-auto hover:underline hover:text-red-500 transition ease-in-out'><a href="http://localhost:5173/signup" >go to signup page</a></div>
      </form>
      {loginSuccess && (<span className='bg-green-300'>Login Successfull</span>)}
      {loginError && (<span className='bg-red-300'>{loginError}</span>)}
      </>
    )
}

export default LoginForm;