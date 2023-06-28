import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [ setIsLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  return (
    <AuthContext.Provider value={{ isRegistered, setIsLoggedIn, setIsRegistered }}>
      {children}
    </AuthContext.Provider>
  );
};
