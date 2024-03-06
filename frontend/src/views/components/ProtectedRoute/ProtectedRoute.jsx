// Sample Route Guard component, feel free to change later
import React from 'react';
import { Navigate } from 'react-router-dom';
import './ProtectedRoute.css';

const checkAuth = (children) => {
  // sample function, just return true always for now
  const desiredPage = children.type.name;
  console.log(desiredPage);
  return true;
};

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = checkAuth(children);
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
