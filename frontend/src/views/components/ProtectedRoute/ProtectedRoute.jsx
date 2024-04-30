import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import './ProtectedRoute.css';

const mustBeLoggedOut = ['register', 'login'];
const mustBeLoggedIn = ['profile', 'editprofile', 'changepassword', 'results', 'survey', 'surveypage', 'logout'];
const mustCompleteQuiz = ['results'];

const pingEndpoint = async (token) => {
  const endpoint = 'http://134.209.47.131:1337/api/findUser';
  const body = { token };
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  console.log(data);
  return response;
};

const checkAuth = async (desiredPage, authToken) => {
  console.log(desiredPage);
  if (mustBeLoggedOut.includes(desiredPage)) {
    if (!authToken) {
      return true;
    }
    const res = await pingEndpoint(authToken);
    console.log(res);
    return res.status !== 200;
  } else if (mustBeLoggedIn.includes(desiredPage)) {
    if (!authToken) {
      return false;
    }
    const res = await pingEndpoint(authToken);
    return res.status === 200;
  } else if (mustCompleteQuiz.includes(desiredPage)) {
    return true;
  }
  return false;
};

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const desiredPage = pathSegments[0].toLowerCase();  // Assuming the relevant part is the first segment
  
  useEffect(() => {
    const authenticate = async () => {
      const authToken = sessionStorage.getItem('authToken');
      try {
        const authResult = await checkAuth(desiredPage, authToken);
        setIsAuthenticated(authResult);
      } catch (error) {
        console.error('Authentication error:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    authenticate();
  }, [children, desiredPage]);
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (isAuthenticated) {
    return children;
  } else {
    const warnMessage = mustBeLoggedOut.includes(desiredPage) ? 'You must be logged out to access this page.' :
    mustBeLoggedIn.includes(desiredPage) ? 'You must be logged in to access this page.' :
    'You must complete the quiz to access this page.';
    toast.warn(warnMessage);
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
