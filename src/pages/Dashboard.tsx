import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { SugarReading } from '../types';
import {
  Activity,
  Utensils,
  Dumbbell,
  ArrowRight,
  TrendingUp } from
'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
export function Dashboard() {
  const { user } = useAuth();
  const [latestReading, setLatestReading] = useState<SugarReading | null>(null);
  useEffect(() => {
    if (user) {
      const allReadings = JSON.parse(
        localStorage.getItem('glucocare_readings') || '[]'
      );
      const userReadings = allReadings.filter(
        (r: SugarReading) => r.userId === user.id
      );
      if (userReadings.length > 0) {
        userReadings.sort((a: SugarReading, b: SugarReading) => {
          return (
            new Date(`${b.date}T${b.time}`).getTime() -
            new Date(`${a.date}T${a.time}`).getTime());

        });
        setLatestReading(userReadings[0]);
      }
    }
  }, [user]);
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      className="space-y-8">
      
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Welcome back, {user?.profile.fullName?.split(' ')[0] || 'User'}! 👋
        </h1>
        <p className="text-slate-500">Here's your health overview for today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sugar Card */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
              <Activity className="w-6 h-6" />
            </div>
            <Link
              to="/sugar"
              className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
              
              History <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <h3 className="text-slate-500 font-medium mb-1">
            Latest Sugar Level
          </h3>
          {latestReading ?
          <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-slate-900">
                  {latestReading.value}
                </span>
                <span className="text-slate-500">mg/dL</span>
              </div>
              <p className="text-sm text-slate-400 mt-1">
                {latestReading.type} •{' '}
                {new Date(latestReading.date).toLocaleDateString()}
              </p>
            </div> :

          <div className="text-slate-400 text-sm mt-2">
              No readings logged yet.
            </div>
          }
        </div>

        {/* Diet Card */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center">
              <Utensils className="w-6 h-6" />
            </div>
            <Link
              to="/diet"
              className="text-sm font-medium text-orange-600 hover:text-orange-700 flex items-center gap-1">
              
              Plan <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <h3 className="text-slate-500 font-medium mb-1">Next Meal</h3>
          <div className="text-xl font-bold text-slate-900">Lunch</div>
          <p className="text-sm text-slate-500 mt-1">
            Multigrain Roti with Palak Paneer
          </p>
        </div>

        {/* Exercise Card */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
              <Dumbbell className="w-6 h-6" />
            </div>
            <Link
              to="/exercises"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
              
              View <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <h3 className="text-slate-500 font-medium mb-1">Daily Goal</h3>
          <div className="text-xl font-bold text-slate-900">30 mins Walk</div>
          <p className="text-sm text-slate-500 mt-1">
            Improves insulin sensitivity
          </p>
        </div>
      </div>

      <div className="bg-emerald-600 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10 max-w-lg">
          <h2 className="text-2xl font-bold mb-2">AI Health Insight</h2>
          <p className="text-emerald-100 leading-relaxed">
            Based on your recent activity, maintaining a consistent meal
            schedule and incorporating a 15-minute walk after dinner can help
            stabilize your morning fasting glucose levels.
          </p>
        </div>
        <TrendingUp className="absolute right-8 -bottom-8 w-48 h-48 text-emerald-500 opacity-50" />
      </div>
    </motion.div>);

}