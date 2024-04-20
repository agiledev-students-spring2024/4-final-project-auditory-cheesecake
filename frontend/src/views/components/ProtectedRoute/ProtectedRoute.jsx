// Sample Route Guard component, feel free to change later
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './ProtectedRoute.css';

const mustBeLoggedOut = ['register', 'login',];
const mustBeLoggedIn = ['profile', 'editprofile', 'changepassword', 'results', 'survey', 'logout'];
const mustCompleteQuiz = ['results'];

const pingEndpoint = async (token) => {
  const endpoint = 'http://localhost:1337/api/findUser';
  const body = {
    token: token,
  }
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  console.log(data);
  return response;
};

const checkAuth = async (children) => {
  // sample function, just return true always for now
  const desiredPage = children.type.name.toLowerCase(); 
  console.log(desiredPage);
  const authToken = sessionStorage.getItem('authToken');
  // user must be logged out to access these pages
  if (mustBeLoggedOut.includes(desiredPage)) {
    if (!authToken) {
      return true;
    }
    const res = await pingEndpoint(authToken);
    console.log(res);
    if (res.status === 200) {
      return false;
    }
    return true;
  }
  // user must be logged in to access these pages
  else if (mustBeLoggedIn.includes(desiredPage)) {
    if (!authToken) {
      return false;
    }
    const res = await pingEndpoint(authToken);
    if (res.status === 200) {
      return true;
    }
    return false;
  }
  // user must have completed the quiz to access these pages
  else if (mustCompleteQuiz.includes(desiredPage)) {
    // placeholder
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
  const desiredPage = children.type.name.toLowerCase(); 

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
  if (isAuthenticated) {
    return children;
  }
  else {
    if (mustBeLoggedOut.includes(desiredPage)) {
      toast.warn('You must be logged out to access this page.', {
        position: "top-right",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    else if (mustBeLoggedIn.includes(desiredPage)) {
      toast.warn('You must be logged in to access this page.', {
        position: "top-right",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    else {
      toast.warn('You must complete the quiz to access this page.', {
        position: "top-right",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
