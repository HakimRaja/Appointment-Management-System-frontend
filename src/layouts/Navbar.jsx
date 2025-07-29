import React, { useContext, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { IoLogOutOutline, IoLogInOutline, IoPersonAddOutline } from 'react-icons/io5';

const Navbar = () => {
  const location = useLocation();
  const {user , logoutUser} = useContext(AuthContext);
    return (
        <nav className='bg-slate-800/50 sticky z-50 backdrop-blur-md border-b border-slate-700/40 shadow-md top-0'>
            <div className='font-semibold flex flex-col sm:flex-row items-center justify-between p-4 text-white'>
            <div className='space-x-2'><Link to='/' className='hover:cursor-pointer hover:underline text-cyan-400 font-bold'>AMS</Link>
            {user?.role == 'patient' && <> <Link to='/patient/appointments' className='hover:cursor-pointer hover:underline'>Appointments</Link></>}
            {user?.role == 'doctor' && <> <Link to='/doctor/availability' className='hover:cursor-pointer hover:underline'>Add Availability</Link></>}
            </div>
            <div>{user && <div>Welcome <span className='text-cyan-300'>{user.name}</span></div>}</div>
            <div className='space-x-4 '>
                {user && <button className='bg-gradient-to-r from-red-600 to-pink-600 p-2 rounded-full hover:from-red-500 hover:to-pink-500 transition ease-in-out hover:scale-105 flex items-center space-x-2' onClick={logoutUser}><IoLogInOutline className='w-4 h-4'/> <span>Logout</span></button>}
                {!user && <>
                {location.pathname === '/signup' ? <Link className='bg-gradient-to-r from-blue-600 to-cyan-600 p-3 rounded-full hover:from-blue-500 hover:to-cyan-500 transition ease-in-out hover:scale-105 flex items-center space-x-1' to='/login'><IoLogInOutline className='w-4 h-4'/><span>Login</span></Link>:
                <Link className='bg-gradient-to-r from-green-500 to-emerald-500  p-3 rounded-full hover:from-green-400 hover:bg-emerald-400 transition ease-in-out hover:scale-105 flex items-center space-x-2' to='/signup'><IoPersonAddOutline/><span>Signup</span></Link>}
                </>}
            </div>
            </div>
        </nav>
  )
}

export default Navbar;