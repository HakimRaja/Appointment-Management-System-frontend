import { BrowserRouter as Router,Routes,Route, Navigate } from 'react-router-dom'
import React, { useContext } from 'react'
import SignupPage from '../pages/SignupPage'
import LoginPage from '../pages/LoginPage'
import Home from '../pages/Home'
import { AuthContext } from '../context/AuthContext'

const AppRoutes = () => {
    const {isAuthenticated}  =useContext(AuthContext);
    return (
    <Router>
        <Routes>
            <Route path='/' element={isAuthenticated ? <Home/>:<Navigate to='/login'/>}/>
            <Route path='/signup' element={isAuthenticated ? <Navigate to='/'/>:<SignupPage/>}/>
            <Route path='/login' element={isAuthenticated ? <Navigate to='/'/>:<LoginPage/>}/>
            <Route path='*' element={<h1>Page Not Found</h1>}/>
            
        </Routes>
    </Router>
  )
}

export default AppRoutes