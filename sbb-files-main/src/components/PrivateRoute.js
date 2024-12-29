import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, isAuthenticated, allowedRoles, userRole }) => {
    // If not authenticated, redirect to the login or welcome page
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    // If roles are defined and the user's role isn't allowed, redirect
    if (allowedRoles && !allowedRoles.includes(userRole)) {
        return <Navigate to={userRole === 'admin' ? '/admin-home' : '/home'} replace />;
    }

    // If authenticated and allowed, render the child component
    return children;
};

export default PrivateRoute;
