import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Navigate } from 'react-router-dom';

const MainRoute = () => {
    const {user , isAuthenticated} = useContext(AuthContext);
    if (isAuthenticated) {
        return <Navigate to={`/${user?.role}`}/>
    }
    return <Navigate to='/login'/>
}

export default MainRoute