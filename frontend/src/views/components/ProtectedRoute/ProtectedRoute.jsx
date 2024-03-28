// Sample Route Guard component, feel free to change later
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import './ProtectedRoute.css';

const mustBeLoggedOut = ['register', 'login',];
const mustBeLoggedIn = ['profile', 'editprofile', 'changepassword',];
const mustCompleteQuiz = ['results'];

const pingEndpoint = async (userObj) => {
  const endpoint = 'http://localhost:1337/api/findUser';
  const params = `?username=${userObj.username}&sessionIdHash=${userObj.sessionIdHash}&lastLogin=${userObj.lastLogin}`;
  const response = await fetch(endpoint + params);
  const data = await response.json();
  return data;
};

const checkAuth = async (children) => {
  // sample function, just return true always for now
  const desiredPage = children.type.name.toLowerCase(); 
  console.log(desiredPage);
  const user = sessionStorage.getItem('user');
  // user must be logged out to access these pages
  if (mustBeLoggedOut.includes(desiredPage)) {
    if (!user) {
      return true;
    }
    const userObj = JSON.parse(user);
    const data = await pingEndpoint(userObj);
    console.log(data);

    // placeholder to always allow access (further logic of what to do if user object is
    // invalid/timed out, user doesn't match what was retrieved etc. still needed)
    return true;
  }
  // user must be logged in to access these pages
  else if (mustBeLoggedIn.includes(desiredPage)) {
    if (!user) {
      return true;
    }
    const userObj = JSON.parse(user);
    const data = await pingEndpoint(userObj);
    console.log(data);

    // placeholder still (further logic of what to do if user object is
    // invalid/timed out etc. still needed)
    return true;
  }
  // user must have completed the quiz to access these pages
  else if (mustCompleteQuiz.includes(desiredPage)) {
    return true;
  }
  // user can access these pages regardless of authentication status
  else {
    return true;
  }
};

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authenticate = async () => {
      try {
        const authResult = await checkAuth(children);
        setIsAuthenticated(authResult);
        console.log('Auth Result:', authResult);
      } catch (error) {
        console.error('Authentication error:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    authenticate();
  }, [children]);

  // Placeholder loading screen
  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log('Final Authenticated State:', isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
