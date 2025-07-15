import React from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login')
  };
  return (
    <div className='max-w-md mx-auto mt-10 p-4 border rounded shadow max-h-md bg-gray-300'>
    <h1 className='text-red-700 font-extrabold'>Welcome {user.userId}</h1>
    <button onClick={logout} className='bg-slate-600 rounded-2xl p-2'>Logout</button>
    </div>
  )
}

export default Home