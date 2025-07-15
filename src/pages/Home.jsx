import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const {logoutUser ,user} = useContext(AuthContext);

  return (
    <div className='max-w-md mx-auto mt-10 p-4 border rounded shadow max-h-md bg-gray-300'>
    <h1 className='text-red-700 font-extrabold'>Welcome {user.userId}</h1>
    <button onClick={logoutUser} className='bg-slate-600 rounded-2xl p-2'>Logout</button>
    </div>
  )
}

export default Home