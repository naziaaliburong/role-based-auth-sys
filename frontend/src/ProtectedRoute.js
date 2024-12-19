import React from "react";
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({allowedRoles, children}) => {
    const role = localStorage.getItem('role');
    return allowedRoles.includes(role) ? children : <Navigate to='/' />;
};
export default ProtectedRoute;