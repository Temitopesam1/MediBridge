// src/pages/logout.js

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../Auth';

function Logout() {
    const handleLogout = () => {
        alert('logged out successfully')
    }
  const navigate = useNavigate();

  useEffect(() => {
    // Perform logout logic, such as clearing the authentication state
    logout();
    // Redirect to the home page after logout
    navigate('/');
  }, [navigate]);

  return (
    <div>
        <button onClick={ handleLogout }></button>
    </div>
  );
}

export default Logout;
