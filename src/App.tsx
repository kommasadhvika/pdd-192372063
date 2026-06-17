import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Layout } from './components/Layout';
import { Auth } from './pages/Auth';
import { Dashboard } from './pages/Dashboard';
import { Profile } from './pages/Profile';
import { SugarTracker } from './pages/SugarTracker';
import { DietPlan } from './pages/DietPlan';
import { Exercises } from './pages/Exercises';
// Protected Route Wrapper
function ProtectedRoute({ children }: {children: React.ReactNode;}) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  return <Layout>{children}</Layout>;
}
function AppRoutes() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route
        path="/auth"
        element={user ? <Navigate to="/" replace /> : <Auth />} />
      

      <Route
        path="/"
        element={
        <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      
      <Route
        path="/profile"
        element={
        <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
      
      <Route
        path="/sugar"
        element={
        <ProtectedRoute>
            <SugarTracker />
          </ProtectedRoute>
        } />
      
      <Route
        path="/diet"
        element={
        <ProtectedRoute>
            <DietPlan />
          </ProtectedRoute>
        } />
      
      <Route
        path="/exercises"
        element={
        <ProtectedRoute>
            <Exercises />
          </ProtectedRoute>
        } />
      

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>);

}
export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>);

}