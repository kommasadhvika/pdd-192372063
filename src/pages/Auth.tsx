import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Droplets,
  Mail,
  Lock,
  User as UserIcon,
  ArrowRight } from
'lucide-react';
import { motion } from 'framer-motion';
export function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all required fields');
      return;
    }
    if (!isLogin) {
      if (!fullName) {
        setError('Full name is required');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
    }
    try {
      if (isLogin) {
        login(email, password);
      } else {
        signup(email, password, fullName);
      }
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    }
  };
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden">
        
        <div className="bg-emerald-600 p-8 text-center text-white">
          <div className="flex justify-center mb-4">
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
              <Droplets className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-2">GlucoCare AI</h1>
          <p className="text-emerald-100 text-sm">
            Your intelligent diabetes management companion
          </p>
        </div>

        <div className="p-8">
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => {
                setIsLogin(true);
                setError('');
              }}
              className={`flex-1 pb-2 text-sm font-medium border-b-2 transition-colors ${isLogin ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>
              
              Sign In
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                setError('');
              }}
              className={`flex-1 pb-2 text-sm font-medium border-b-2 transition-colors ${!isLogin ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>
              
              Create Account
            </button>
          </div>

          {error &&
          <div className="mb-6 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
              {error}
            </div>
          }

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin &&
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  placeholder="John Doe" />
                
                </div>
              </div>
            }

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  placeholder="you@example.com" />
                
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  placeholder="••••••••" />
                
              </div>
            </div>

            {!isLogin &&
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  placeholder="••••••••" />
                
                </div>
              </div>
            }

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2 mt-6">
              
              {isLogin ? 'Sign In' : 'Create Account'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </motion.div>
    </div>);

}