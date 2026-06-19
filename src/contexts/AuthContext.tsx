import React, { useEffect, useState, createContext, useContext } from 'react';
import { User, UserProfile } from '../types';
interface AuthContextType {
  user: User | null;
  login: (email: string, password?: string) => void;
  signup: (email: string, password?: string, fullName?: string) => void;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export function AuthProvider({ children }: {children: ReactNode;}) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const storedUser = localStorage.getItem('glucocare_current_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const login = (email: string) => {
    const users = JSON.parse(localStorage.getItem('glucocare_users') || '[]');
    const existingUser = users.find((u: User) => u.email === email);
    if (existingUser) {
      setUser(existingUser);
      localStorage.setItem(
        'glucocare_current_user',
        JSON.stringify(existingUser)
      );
    } else {
      throw new Error('User not found');
    }
  };
  const signup = (email: string, password?: string, fullName: string = '') => {
    const users = JSON.parse(localStorage.getItem('glucocare_users') || '[]');
    if (users.find((u: User) => u.email === email)) {
      throw new Error('User already exists');
    }
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      password,
      profile: {
        fullName
      }
    };
    users.push(newUser);
    localStorage.setItem('glucocare_users', JSON.stringify(users));
    setUser(newUser);
    localStorage.setItem('glucocare_current_user', JSON.stringify(newUser));
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('glucocare_current_user');
  };
  const updateProfile = (profileUpdates: Partial<UserProfile>) => {
    if (!user) return;
    const updatedUser = {
      ...user,
      profile: {
        ...user.profile,
        ...profileUpdates
      }
    };
    setUser(updatedUser);
    localStorage.setItem('glucocare_current_user', JSON.stringify(updatedUser));
    const users = JSON.parse(localStorage.getItem('glucocare_users') || '[]');
    const updatedUsers = users.map((u: User) =>
    u.id === user.id ? updatedUser : u
    );
    localStorage.setItem('glucocare_users', JSON.stringify(updatedUsers));
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        updateProfile
      }}>
      
      {children}
    </AuthContext.Provider>);

}
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}