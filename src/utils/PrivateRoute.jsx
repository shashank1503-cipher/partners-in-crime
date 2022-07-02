import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  let { user } = useAuth();
  return user ? children : <Navigate to={'/'} />;
};

export default PrivateRoute;
