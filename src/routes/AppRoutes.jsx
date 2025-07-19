import { Routes,Route, Navigate } from 'react-router-dom'
import React, { useContext } from 'react'
import SignupPage from '../pages/SignupPage'
import LoginPage from '../pages/LoginPage'
import PatientDashboard from '../pages/PatientDashboard'
import { AuthContext } from '../context/AuthContext'

const AppRoutes = () => {
    const {isAuthenticated,user} =useContext(AuthContext);
    return (
        <Routes>
            <Route path='/' element={isAuthenticated ? <Navigate to={`/${user?.role}`}/>:<Navigate to='/login'/>}/>
            <Route path='/patient' element={(isAuthenticated && (user?.role == 'patient')) ? <PatientDashboard/>:<Navigate to='/login'/>}/>
            <Route path='/signup' element={isAuthenticated ? <Navigate to='/'/>:<SignupPage/>}/>
            <Route path='/login' element={isAuthenticated ? <Navigate to='/'/>:<LoginPage/>}/>
            <Route path='*' element={<h1>Page Not Found</h1>}/>
            
        </Routes>
  )
}

export default AppRoutes