import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import React from 'react'
import SignupPage from '../pages/SignupPage'
import LoginPage from '../pages/LoginPage'
import Home from '../pages/Home'

const AppRoutes = () => {
    return (
    <Router>
        <Routes>
            <Route path='/' element={localStorage.getItem('token') ? <Home/>:<SignupPage/>}/>
            <Route path='/signup' element={<SignupPage/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='*' element={<h1>Page Not Found</h1>}/>
            
        </Routes>
    </Router>
  )
}

export default AppRoutes