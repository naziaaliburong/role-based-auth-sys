import React from 'react';
import { Routes, Route} from 'react-router-dom';
import './App.css';
import Login from './Components/Login/Login';
import ProtectedRoute from './ProtectedRoute';
import Home from './Components/Home/Home';

function App() {
  
  return (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={
          <ProtectedRoute allowedRoles={['admin', 'user']}>
            <h1>Web Page for all...</h1>
          </ProtectedRoute>
        }
        />
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <h1>Web Page for only Admin...</h1>
          </ProtectedRoute>
        }
        />
    </Routes>
  );
}

export default App;
