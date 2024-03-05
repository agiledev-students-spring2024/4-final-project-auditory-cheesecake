import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import Profile from './Profile';

import Results from './views/Results/Results';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        
        <Routes>
          {/* Route for Home Page */}
          <Route path="/" element={<HomePage />} />
          
          {/* Route for Test Page */}
          {/* <Route path="/about" element={<Test />} /> */}
          
          {/* Route for Profile Page */}
          <Route path="/profile" element={<Profile />} />
          
          {/* Route for Results Page */}
          {/* !!!!! GUARD THIS ROUTE SO THAT IT CAN ONLY BE ACCESSED W/ CERTAIN CONDITIONS !!!!! */}
          <Route 
            path="/results" 
            element={
              <ProtectedRoute>
                <Results />
              </ProtectedRoute>
            }
          />
          
          {/* Add more route placeholders as needed */}
          
          {/* Fallback route for 404 Not Found */}
          {/* <Route path="*" element={<Home />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
