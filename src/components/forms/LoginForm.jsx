import Input from '../input/Input';
import Button from '../buttons/Button';
import { Link } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import { AuthContext} from '../../context/AuthContext';
import { LOGIN_FIELDS } from '../../constants/loginFields';
import { toast } from 'sonner';

const LoginForm = () => {
  const {loginInfo ,loginSuccess,isLoginLoading , loginUser,updateLoginInfo } = useContext(AuthContext);
  
  

  const handleChange = (e)=>{
      updateLoginInfo({...loginInfo ,[e.target.name] : e.target.value});
    }
    return (
      <>
      <form onSubmit={loginUser}>
        <Input
        {...LOGIN_FIELDS.email}
        value={loginInfo.email}
        onChange={handleChange}
        />

        <Input
        {...LOGIN_FIELDS.password}
        value={loginInfo.password}
        onChange={handleChange}
        />

        <Button type='submit'>{isLoginLoading ? 'Logging into your account' : 'Login'}</Button>
        <div className='text-red-400 mx-auto hover:underline hover:text-red-500 transition ease-in-out'><Link to='/signup'>Go To Signup Page</Link></div>
      </form>
      {loginSuccess && (<span className='bg-green-300'>Login Successfull</span>)}
      </>
    )
}

export default LoginForm;