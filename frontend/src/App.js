import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './views/HomePage/HomePage';
import Profile from './views/Profile/Profile';
import EditProfile from './views/EditProfile/EditProfile';
import ChangePassword from './views/ChangePassword/ChangePassword';
import Results from './views/Results/Results';
import NavBar from './views/components/NavBar/NavBar';
import ProtectedRoute from './views/components/ProtectedRoute/ProtectedRoute';
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import SurveyPage from './views/SurveyPage/SurveyPage';


function App() {
  return (
    <Router>
      <div>
        <NavBar />

        <Routes>
          {/* Route for Home Page */}
          <Route path="/" element={<HomePage />} />

          {/* Route for Test Page */}
          <Route path="/survey" element={<SurveyPage />} />


          {/* Route for Profile Page */}
          <Route
            path="/Profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Route for Edit Profile Page */}
          <Route
            path="/EditProfile"
            element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            }
          />
          
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

          {/* Route Guard for Login */}
          <Route
            path="/Login"
            element={
              <ProtectedRoute>
                <Login />
              </ProtectedRoute>
            }
          />

          {/* Route Guard for Register */}
          <Route
            path="/Register"
            element={
              <ProtectedRoute>
                <Register />
              </ProtectedRoute>
            }
          />

          <Route
            path="/ChangePassword"
            element={
              <ProtectedRoute>
                <ChangePassword />
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
