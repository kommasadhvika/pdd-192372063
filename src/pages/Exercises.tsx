import React from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, Activity, CheckCircle } from 'lucide-react';
const EXERCISES = [
{
  id: 1,
  title: 'Brisk Walking Routine',
  duration: '30 mins',
  intensity: 'Low',
  image:
  'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&q=80&w=600',
  benefits: [
  'Improves insulin sensitivity',
  'Low impact on joints',
  'Great for cardiovascular health'],

  posture: 'Keep head up, back straight, and swing arms naturally.'
},
{
  id: 2,
  title: 'Yoga for Digestion (Vajrasana)',
  duration: '15 mins',
  intensity: 'Low',
  image:
  'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600',
  benefits: [
  'Aids digestion after meals',
  'Reduces belly fat',
  'Calms the mind'],

  posture:
  'Kneel down, sit on your heels, keep spine erect and hands on knees.'
},
{
  id: 3,
  title: 'Light Resistance Training',
  duration: '20 mins',
  intensity: 'Medium',
  image:
  'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=600',
  benefits: [
  'Builds muscle mass',
  'Increases resting metabolic rate',
  'Helps glucose uptake'],

  posture: 'Engage core, avoid locking joints, and breathe out on exertion.'
},
{
  id: 4,
  title: 'Stationary Cycling',
  duration: '25 mins',
  intensity: 'Medium',
  image:
  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=600',
  benefits: [
  'Excellent cardio',
  'Safe for neuropathy',
  'Burns calories efficiently'],

  posture:
  'Adjust seat height so knee is slightly bent at the bottom of the pedal stroke.'
}];

export function Exercises() {
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
      className="max-w-5xl mx-auto space-y-8">
      
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Exercise & Posture
        </h1>
        <p className="text-slate-500">
          Safe, effective routines to help manage blood sugar levels.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {EXERCISES.map((exercise) =>
        <motion.div
          key={exercise.id}
          whileHover={{
            y: -4
          }}
          className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          
            <div className="relative h-48 group cursor-pointer">
              <img
              src={exercise.image}
              alt={exercise.title}
              className="w-full h-full object-cover" />
            
              <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Play className="w-8 h-8 text-white fill-white" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 flex gap-2">
                <span className="px-2.5 py-1 bg-slate-900/70 backdrop-blur-sm text-white text-xs font-medium rounded-lg flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {exercise.duration}
                </span>
                <span className="px-2.5 py-1 bg-emerald-600/90 backdrop-blur-sm text-white text-xs font-medium rounded-lg flex items-center gap-1">
                  <Activity className="w-3 h-3" /> {exercise.intensity}
                </span>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                {exercise.title}
              </h3>

              <div className="mb-4">
                <h4 className="text-sm font-semibold text-slate-900 mb-2">
                  Key Benefits:
                </h4>
                <ul className="space-y-2">
                  {exercise.benefits.map((benefit, idx) =>
                <li
                  key={idx}
                  className="flex items-start gap-2 text-sm text-slate-600">
                  
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      {benefit}
                    </li>
                )}
                </ul>
              </div>

              <div className="mt-auto pt-4 border-t border-slate-100">
                <h4 className="text-sm font-semibold text-slate-900 mb-1">
                  Posture Tip:
                </h4>
                <p className="text-sm text-slate-600 italic">
                  {exercise.posture}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>);

}