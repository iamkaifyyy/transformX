import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  currentUser: User;
  switchRole: (role: UserRole) => void;
}

const DEFAULT_USER: User = {
  id: 'usr-1',
  name: 'Security Admin',
  email: 'admin@crypto-creds.internal',
  role: 'admin',
  avatar: 'SA'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(DEFAULT_USER);

  const switchRole = (role: UserRole) => {
    let name = 'System Admin';
    let email = 'admin@crypto-creds.internal';
    let avatar = 'SA';

    if (role === 'reviewer') {
      name = 'Security Reviewer';
      email = 'reviewer@crypto-creds.internal';
      avatar = 'SR';
    } else if (role === 'contributor') {
      name = 'Content Specialist';
      email = 'contributor@crypto-creds.internal';
      avatar = 'CS';
    }

    setCurrentUser({
      id: `usr-${role}`,
      name,
      email,
      role,
      avatar
    });
  };

  return (
    <AuthContext.Provider value={{ currentUser, switchRole }}>
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
