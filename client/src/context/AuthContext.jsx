import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Placeholder user for Phase 1 UI exploration
  const [user, setUser] = useState({
    id: 'user-001',
    name: 'Alex Mercer',
    email: 'alex.mercer@resolveai.internal',
    role: 'SUPPORT_AGENT', // SUPPORT_AGENT | ENGINEER | MANAGER | ADMIN
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  });

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const login = (email, password) => {
    // Foundation stub - full auth in Phase 3
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const switchRole = (newRole) => {
    setUser((prev) => ({ ...prev, role: newRole }));
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
