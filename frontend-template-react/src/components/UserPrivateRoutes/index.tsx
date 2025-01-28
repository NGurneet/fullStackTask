import React, { useState, useEffect } from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

// UserPrivateRoute component
const UserPrivateRoute = () => {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // Decode token to fetch role or call API with refresh token to get the user info
        const decodedToken: any = jwtDecode(token);
        setRole(decodedToken.role);

        setLoading(false);
      } catch (error) {
        console.error('Error decoding token:', error);
        setRole(null);
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!role || role !== 'USER') {
    // Redirect to login page if not logged in or not a user
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default UserPrivateRoute;
