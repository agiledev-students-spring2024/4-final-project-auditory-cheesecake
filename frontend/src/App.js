import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './views/HomePage/HomePage';
import Profile from './Profile';
import Results from './views/Results/Results';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

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
            path="/Results" 
            element={
              <ProtectedRoute>
                <Results />
              </ProtectedRoute>
            }
          />
          
          {/* Add more route placeholders as needed */}
          
          {/* Fallback route for any invalid routes */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
