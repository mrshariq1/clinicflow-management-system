import React, { createContext, useContext, useState } from 'react';
import { getStorage, setStorage, removeStorage } from '../services/storage';
import doctorPortraitImg from '../assets/images/doctor_portrait_lead_1790450323837.jpg';

export interface User {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
  clinic: string;
}

const defaultDemoUser: User = {
  id: 'usr-1',
  name: 'Dr. Alexander Wright',
  role: 'Clinical Administrator',
  email: 'demo@clinicflow.com',
  avatar: doctorPortraitImg,
  clinic: 'ClinicFlow Medical Center',
};

interface AuthContextType {
  user: User | null;
  login: (credentials?: { email: string; password?: string }) => boolean;
  logout: () => void;
  updateUserProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = getStorage('user', defaultDemoUser);
    if (saved && (typeof saved.avatar !== 'string' || saved.avatar.includes('unsplash.com'))) {
      saved.avatar = doctorPortraitImg;
    }
    return saved;
  });

  const login = (credentials?: { email: string; password?: string }) => {
    const activeUser = {
      ...defaultDemoUser,
      email: credentials?.email || defaultDemoUser.email,
    };
    setUser(activeUser);
    setStorage('user', activeUser);
    return true;
  };

  const logout = () => {
    setUser(null);
    removeStorage('user');
  };

  const updateUserProfile = (data: Partial<User>) => {
    setUser(prev => {
      if (!prev) return null;
      const updated = { ...prev, ...data };
      setStorage('user', updated);
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUserProfile }}>
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
