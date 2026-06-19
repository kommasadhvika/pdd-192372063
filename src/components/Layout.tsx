import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  LayoutDashboard,
  Activity,
  Utensils,
  Dumbbell,
  User as UserIcon,
  LogOut,
  Menu,
  X,
  Droplets } from
'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
export function Layout({ children }: {children: React.ReactNode;}) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = [
  {
    path: '/',
    label: 'Dashboard',
    icon: LayoutDashboard
  },
  {
    path: '/sugar',
    label: 'Sugar Tracker',
    icon: Activity
  },
  {
    path: '/diet',
    label: 'Diet Plan',
    icon: Utensils
  },
  {
    path: '/exercises',
    label: 'Exercises',
    icon: Dumbbell
  },
  {
    path: '/profile',
    label: 'Profile',
    icon: UserIcon
  }];

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 fixed h-full z-10">
        <div className="p-6 flex items-center gap-3 text-emerald-600">
          <Droplets className="w-8 h-8" />
          <span className="text-xl font-bold tracking-tight">GlucoCare AI</span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive ? 'bg-emerald-50 text-emerald-700 font-medium' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
                
                <Icon
                  className={`w-5 h-5 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                
                {item.label}
              </Link>);

          })}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 px-4 py-3 mb-2">
            {user?.profile.avatarUrl ?
            <img
              src={user.profile.avatarUrl}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border border-slate-200" /> :


            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                {user?.profile.fullName?.charAt(0) || user?.email.charAt(0)}
              </div>
            }
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">
                {user?.profile.fullName || 'User'}
              </p>
              <p className="text-xs text-slate-500 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-20 flex items-center justify-between px-4">
        <div className="flex items-center gap-2 text-emerald-600">
          <Droplets className="w-6 h-6" />
          <span className="text-lg font-bold">GlucoCare AI</span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 text-slate-600">
          
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen &&
        <>
            <motion.div
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            exit={{
              opacity: 0
            }}
            className="fixed inset-0 bg-slate-900/50 z-30 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)} />
          
            <motion.div
            initial={{
              x: '100%'
            }}
            animate={{
              x: 0
            }}
            exit={{
              x: '100%'
            }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 200
            }}
            className="fixed top-0 right-0 bottom-0 w-64 bg-white z-40 shadow-xl flex flex-col md:hidden">
            
              <div className="p-4 flex justify-end">
                <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-slate-500">
                
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="flex-1 px-4 space-y-1">
                {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive ? 'bg-emerald-50 text-emerald-700 font-medium' : 'text-slate-600 hover:bg-slate-50'}`}>
                    
                      <Icon
                      className={`w-5 h-5 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                    
                      {item.label}
                    </Link>);

              })}
              </nav>
              <div className="p-4 border-t border-slate-100">
                <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </div>
            </motion.div>
          </>
        }
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 pt-16 md:pt-0 min-h-screen">
        <div className="p-4 md:p-8 max-w-5xl mx-auto">{children}</div>
      </main>
    </div>);

}