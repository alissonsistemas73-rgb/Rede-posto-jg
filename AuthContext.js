import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    console.log('Stored user from localStorage:', storedUser); // DEBUG
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    console.log('Login attempt with:', email, password); // DEBUG
    
    if (email === 'admin@rh.com' && password === 'admin123') {
      const userData = {
        id: 1,
        email: email,
        name: 'Administrador',
        role: 'Administrador'
      };
      console.log('Login successful:', userData); // DEBUG
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return userData;
    } else if (email === 'rh@rh.com' && password === 'rh123') {
      const userData = {
        id: 2,
        email: email,
        name: 'Usuário RH',
        role: 'RH'
      };
      console.log('Login successful:', userData); // DEBUG
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return userData;
    } else {
      console.log('Login failed: Credenciais inválidas'); // DEBUG
      throw new Error('Credenciais inválidas');
    }
  };

  const logout = () => {
    console.log('Logout'); // DEBUG
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};