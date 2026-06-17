import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { SugarReading, ReadingType } from '../types';
import { Plus, Activity, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine } from
'recharts';
export function SugarTracker() {
  const { user } = useAuth();
  const [readings, setReadings] = useState<SugarReading[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    value: '',
    type: 'Fasting' as ReadingType,
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    notes: ''
  });
  useEffect(() => {
    if (user) {
      const allReadings = JSON.parse(
        localStorage.getItem('glucocare_readings') || '[]'
      );
      const userReadings = allReadings.filter(
        (r: SugarReading) => r.userId === user.id
      );
      // Sort by date and time descending
      userReadings.sort((a: SugarReading, b: SugarReading) => {
        return (
          new Date(`${b.date}T${b.time}`).getTime() -
          new Date(`${a.date}T${a.time}`).getTime());

      });
      setReadings(userReadings);
    }
  }, [user]);
  const getHealthStatus = (value: number, type: ReadingType) => {
    if (type === 'Fasting' || type === 'Before Meal') {
      if (value < 70)
      return {
        label: 'Low',
        color: 'text-red-600',
        bg: 'bg-red-50',
        border: 'border-red-200'
      };
      if (value <= 99)
      return {
        label: 'Normal',
        color: 'text-emerald-600',
        bg: 'bg-emerald-50',
        border: 'border-emerald-200'
      };
      if (value <= 125)
      return {
        label: 'Pre-diabetic',
        color: 'text-yellow-600',
        bg: 'bg-yellow-50',
        border: 'border-yellow-200'
      };
      return {
        label: 'High',
        color: 'text-orange-600',
        bg: 'bg-orange-50',
        border: 'border-orange-200'
      };
    } else {
      // After Meal, Random, Bedtime
      if (value < 70)
      return {
        label: 'Low',
        color: 'text-red-600',
        bg: 'bg-red-50',
        border: 'border-red-200'
      };
      if (value <= 140)
      return {
        label: 'Normal',
        color: 'text-emerald-600',
        bg: 'bg-emerald-50',
        border: 'border-emerald-200'
      };
      if (value <= 199)
      return {
        label: 'Pre-diabetic',
        color: 'text-yellow-600',
        bg: 'bg-yellow-50',
        border: 'border-yellow-200'
      };
      return {
        label: 'High',
        color: 'text-orange-600',
        bg: 'bg-orange-50',
        border: 'border-orange-200'
      };
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !formData.value) return;
    const newReading: SugarReading = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      value: Number(formData.value),
      type: formData.type,
      date: formData.date,
      time: formData.time,
      notes: formData.notes
    };
    const allReadings = JSON.parse(
      localStorage.getItem('glucocare_readings') || '[]'
    );
    allReadings.push(newReading);
    localStorage.setItem('glucocare_readings', JSON.stringify(allReadings));
    setReadings(
      [newReading, ...readings].sort((a, b) => {
        return (
          new Date(`${b.date}T${b.time}`).getTime() -
          new Date(`${a.date}T${a.time}`).getTime());

      })
    );
    setShowForm(false);
    setFormData({
      ...formData,
      value: '',
      notes: ''
    });
  };
  // Prepare chart data (reverse to show chronological order left to right)
  const chartData = [...readings].
  reverse().
  map((r) => ({
    ...r,
    displayDate: `${r.date.slice(5)} ${r.time}`
  })).
  slice(-10); // Last 10 readings
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
      className="max-w-5xl mx-auto space-y-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Sugar Level Tracker
          </h1>
          <p className="text-slate-500">
            Monitor your blood glucose trends over time.
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl font-medium transition-colors flex items-center gap-2">
          
          <Plus className="w-4 h-4" />
          Log Reading
        </button>
      </div>

      {showForm &&
      <motion.form
        initial={{
          opacity: 0,
          height: 0
        }}
        animate={{
          opacity: 1,
          height: 'auto'
        }}
        className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200"
        onSubmit={handleSubmit}>
        
          <h3 className="text-lg font-semibold mb-4">New Reading</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Value (mg/dL)
              </label>
              <input
              type="number"
              required
              value={formData.value}
              onChange={(e) =>
              setFormData({
                ...formData,
                value: e.target.value
              })
              }
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
              placeholder="e.g. 105" />
            
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Type
              </label>
              <select
              value={formData.type}
              onChange={(e) =>
              setFormData({
                ...formData,
                type: e.target.value as ReadingType
              })
              }
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none">
              
                <option value="Fasting">Fasting</option>
                <option value="Before Meal">Before Meal</option>
                <option value="After Meal">After Meal</option>
                <option value="Random">Random</option>
                <option value="Bedtime">Bedtime</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Date
              </label>
              <input
              type="date"
              required
              value={formData.date}
              onChange={(e) =>
              setFormData({
                ...formData,
                date: e.target.value
              })
              }
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
            
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Time
              </label>
              <input
              type="time"
              required
              value={formData.time}
              onChange={(e) =>
              setFormData({
                ...formData,
                time: e.target.value
              })
              }
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
            
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Notes (Optional)
            </label>
            <input
            type="text"
            value={formData.notes}
            onChange={(e) =>
            setFormData({
              ...formData,
              notes: e.target.value
            })
            }
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
            placeholder="e.g. Had a heavy dinner" />
          
          </div>
          <div className="flex justify-end gap-3">
            <button
            type="button"
            onClick={() => setShowForm(false)}
            className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-medium transition-colors">
            
              Cancel
            </button>
            <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-xl font-medium transition-colors">
            
              Save Reading
            </button>
          </div>
        </motion.form>
      }

      {readings.length > 0 ?
      <>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-[400px]">
            <h3 className="text-lg font-semibold mb-6">Recent Trends</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
              data={chartData}
              margin={{
                top: 5,
                right: 20,
                bottom: 25,
                left: 0
              }}>
              
                <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e2e8f0" />
              
                <XAxis
                dataKey="displayDate"
                tick={{
                  fontSize: 12,
                  fill: '#64748b'
                }}
                tickMargin={10} />
              
                <YAxis
                domain={['dataMin - 20', 'dataMax + 20']}
                tick={{
                  fontSize: 12,
                  fill: '#64748b'
                }}
                axisLine={false}
                tickLine={false} />
              
                <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: 'none',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }} />
              
                <ReferenceLine y={100} stroke="#10b981" strokeDasharray="3 3" />
                <ReferenceLine y={140} stroke="#f59e0b" strokeDasharray="3 3" />
                <Line
                type="monotone"
                dataKey="value"
                stroke="#059669"
                strokeWidth={3}
                dot={{
                  r: 4,
                  fill: '#059669',
                  strokeWidth: 2,
                  stroke: '#fff'
                }}
                activeDot={{
                  r: 6,
                  fill: '#059669',
                  stroke: '#fff',
                  strokeWidth: 2
                }} />
              
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h3 className="text-lg font-semibold">History</h3>
            </div>
            <div className="divide-y divide-slate-100">
              {readings.map((reading) => {
              const status = getHealthStatus(reading.value, reading.type);
              return (
                <div
                  key={reading.id}
                  className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                  
                    <div className="flex items-center gap-4">
                      <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${status.bg} ${status.color}`}>
                      
                        <Activity className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-slate-900">
                            {reading.value}
                          </span>
                          <span className="text-sm text-slate-500">mg/dL</span>
                          <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${status.bg} ${status.color} ${status.border}`}>
                          
                            {status.label}
                          </span>
                        </div>
                        <div className="text-sm text-slate-500 mt-1">
                          {reading.type} •{' '}
                          {new Date(reading.date).toLocaleDateString()} at{' '}
                          {reading.time}
                        </div>
                        {reading.notes &&
                      <div className="text-sm text-slate-600 mt-1 italic flex items-center gap-1">
                            <Info className="w-3 h-3" /> {reading.notes}
                          </div>
                      }
                      </div>
                    </div>
                  </div>);

            })}
            </div>
          </div>
        </> :

      <div className="bg-white p-12 rounded-2xl shadow-sm border border-slate-200 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Activity className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            No readings yet
          </h3>
          <p className="text-slate-500 max-w-sm mx-auto">
            Start tracking your blood sugar levels to see trends and get
            personalized insights.
          </p>
        </div>
      }
    </motion.div>);

}