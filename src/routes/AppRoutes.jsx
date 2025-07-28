import { Routes,Route, Navigate } from 'react-router-dom'
import React from 'react'
import SignupPage from '../pages/SignupPage'
import LoginPage from '../pages/LoginPage'
import PatientDashboard from '../pages/PatientDashboard'
import Home from '../pages/Home'
import PatientAppointments from '../pages/PatientAppointments'
import DoctorDashboard from '../pages/DoctorDashboard'
import DoctorAvailabilities from '../pages/DoctorAvailabilities'
import PrivateRoute from '../components/routes/PrivateRoute'
import MainRoute from '../components/routes/MainRoute'
import PublicRoute from '../components/routes/PublicRoute'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<MainRoute/>}/>

            <Route path='/patient' element={<PrivateRoute element={PatientDashboard} role='patient'/>}/>
            <Route path='/doctor' element={<PrivateRoute element={DoctorDashboard} role='doctor'/>}/>
            <Route path='/doctor/availability' element={<PrivateRoute element={DoctorAvailabilities} role='doctor'/>}/>
            <Route path='patient/appointments' element={<PrivateRoute element={PatientAppointments} role='patient'/>}/>

            <Route path='/signup' element={<PublicRoute element={SignupPage}/>}/>
            <Route path='/login' element={<PublicRoute element={LoginPage}/>}/>
            <Route path='*' element={<PublicRoute element={Home} />}/>
            
        </Routes>
  )
}

export default AppRoutes;