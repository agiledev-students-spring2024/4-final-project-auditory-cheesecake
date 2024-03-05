import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Results from './views/Results/Results';
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
          
          {/* Route for Results Page */}
          {/* !!!!! GUARD THIS ROUTE LATER SO THAT IT CAN ONLY BE ACCESSED THROUGH CERTAIN PAGES !!!!! */}
          <Route path="/Results" element={<Results />} />
          
          {/* Add more route placeholders as needed */}
          
          {/* Fallback route for 404 Not Found */}
          {/* <Route path="*" element={<Home />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
