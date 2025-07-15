import { BrowserRouter as Router,Routes,Route, Navigate } from 'react-router-dom'
import React, { useContext } from 'react'
import SignupPage from '../pages/SignupPage'
import LoginPage from '../pages/LoginPage'
import Home from '../pages/Home'
import { AuthContext } from '../context/AuthContext'

const AppRoutes = () => {
    const {user}  =useContext(AuthContext);
    return (
    <Router>
        <Routes>
            <Route path='/' element={user ? <Home/>:<Navigate to='/login'/>}/>
            <Route path='/signup' element={user ? <Navigate to='/'/>:<SignupPage/>}/>
            <Route path='/login' element={user ? <Navigate to='/'/>:<LoginPage/>}/>
            <Route path='*' element={<h1>Page Not Found</h1>}/>
            
        </Routes>
    </Router>
  )
}

export default AppRoutes