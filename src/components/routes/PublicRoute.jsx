import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Navigate } from 'react-router-dom';

const PublicRoute = ({element : Element}) => {
  const {isAuthenticated} = useContext(AuthContext);
  if (isAuthenticated) {
    return <Navigate to='/'/>
  }
  return <Element />;
}

export default PublicRoute