import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const DoctorDashboard = () => {
  const {isAuthenticated,user} = useContext(AuthContext);

  return (
    <div className='min-h-screen m-3'>
        <div className='text-center text-lg font-bold'>Doctor Dashboard</div>
    </div>
  )
}

export default DoctorDashboard;