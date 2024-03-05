// Sample Route Guard component, feel free to change later
import React from 'react';
import { Navigate } from 'react-router-dom';

const checkAuth = () => {
  //   sample function, just return true always for now
  return true;
};

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = checkAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
