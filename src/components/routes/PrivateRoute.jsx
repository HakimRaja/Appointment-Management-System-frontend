import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'

const PrivateRoute = ({element : Element,role}) => {
  const {user,isAuthenticated} = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to='/login'/>
  }
  if (role && user?.role !== role) {
    return <Navigate to='/'/>
  }

  return <Element/>;
}

export default PrivateRoute