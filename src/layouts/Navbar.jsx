import React, { useContext, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const {user , logoutUser} = useContext(AuthContext);
    return (
        <nav className='bg-gray-200 font-semibold flex flex-col sm:flex-row items-center justify-between p-3'>
            <div className='space-x-2'><Link to='/' className='hover:cursor-pointer hover:underline'>AMS</Link>
            {user?.role == 'patient' && <> |<Link to='/patient/appointments' className='hover:cursor-pointer hover:underline'>Appointments</Link></>}
            {user?.role == 'doctor' && <> |<Link to='/doctor/availability' className='hover:cursor-pointer hover:underline'>Add Availability</Link></>}
            </div>
            <div>{user && <div>Welcome {user.name}!</div>}</div>
            <div className='space-x-4 '>
                {user && <button className='bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition ease-in-out hover:scale-105 text-white' onClick={logoutUser}>Logout</button>}
                {!user && <>
                {location.pathname === '/signup' ? <Link className='bg-blue-600 p-3 rounded-full hover:bg-blue-700 transition ease-in-out hover:scale-105 text-white' to='/login'>Login</Link>:
                <Link className='bg-blue-600 p-3 rounded-full hover:bg-blue-700 transition ease-in-out hover:scale-105 text-white' to='/signup'>Signup</Link>}
                </>}
            </div>
            
        </nav>
  )
}

export default Navbar;