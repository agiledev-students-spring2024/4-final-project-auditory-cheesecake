import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        
        <Routes>
          {/* Route for Home Page */}
          {/* <Route path="/" element={<HomePage />} /> */}
          
          {/* Route for Test Page */}
          {/* <Route path="/about" element={<Test />} /> */}
          
          {/* Route for Profile Page */}
          {/* <Route path="/contact" element={<Profile />} /> */}
          
          {/* Add more route placeholders as needed */}
          
          {/* Fallback route for 404 Not Found */}
          {/* <Route path="*" element={<Home />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
