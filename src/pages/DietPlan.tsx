import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Utensils,
  Clock,
  ChevronRight,
  ListChecks,
  ChefHat } from
'lucide-react';
import { MEAL_PLANS, Meal } from '../data/mealPlans';
export function DietPlan() {
  const [isIndian, setIsIndian] = useState(true);
  const [isVeg, setIsVeg] = useState(true);
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const weekPlan =
  MEAL_PLANS[isIndian ? 'indian' : 'global'][isVeg ? 'veg' : 'nonVeg'];
  const currentDay = weekPlan[selectedDayIdx];
  // Reset selection when filters change
  const setPreference = (next: () => void) => {
    next();
    setSelectedMeal(null);
  };
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
        <h1 className="text-2xl font-bold text-slate-900">AI Diet Plan</h1>
        <p className="text-slate-500">
          Full 7-day diabetes-friendly meal plan, customized to your
          preferences.
        </p>
      </div>

      {/* Preferences */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-semibold mb-4">Dietary Preferences</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setPreference(() => setIsIndian(true))}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${isIndian ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>
              
              Indian Cuisine
            </button>
            <button
              onClick={() => setPreference(() => setIsIndian(false))}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${!isIndian ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>
              
              Global Cuisine
            </button>
          </div>
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setPreference(() => setIsVeg(true))}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${isVeg ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>
              
              Vegetarian
            </button>
            <button
              onClick={() => setPreference(() => setIsVeg(false))}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${!isVeg ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>
              
              Non-Vegetarian
            </button>
          </div>
        </div>
      </div>

      {/* Day Selector */}
      <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {weekPlan.map((d, idx) =>
          <button
            key={d.day}
            onClick={() => {
              setSelectedDayIdx(idx);
              setSelectedMeal(null);
            }}
            className={`flex-1 px-4 py-3 rounded-xl text-sm font-semibold transition-all min-w-[100px] ${selectedDayIdx === idx ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200' : 'text-slate-600 hover:bg-slate-50'}`}>
            
              <div className="text-xs opacity-80 mb-0.5">Day {idx + 1}</div>
              {d.day.slice(0, 3)}
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Day's Schedule */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-baseline justify-between">
            <h3 className="text-xl font-bold text-slate-900">
              {currentDay.day}'s Schedule
            </h3>
            <span className="text-sm text-slate-500">
              {currentDay.meals.reduce((sum, m) => sum + m.calories, 0)} kcal
              total
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${isIndian}-${isVeg}-${selectedDayIdx}`}
              initial={{
                opacity: 0,
                y: 8
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              exit={{
                opacity: 0,
                y: -8
              }}
              transition={{
                duration: 0.2
              }}
              className="space-y-4">
              
              {currentDay.meals.map((meal, idx) =>
              <motion.div
                key={idx}
                whileHover={{
                  scale: 1.01
                }}
                onClick={() => setSelectedMeal(meal)}
                className={`bg-white p-4 rounded-2xl border cursor-pointer transition-all ${selectedMeal?.name === meal.name ? 'border-emerald-500 shadow-md ring-1 ring-emerald-500' : 'border-slate-200 shadow-sm hover:border-emerald-300'}`}>
                
                  <div className="flex gap-4">
                    <img
                    src={meal.image}
                    alt={meal.name}
                    className="w-24 h-24 rounded-xl object-cover flex-shrink-0" />
                  
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium mb-1">
                        <Clock className="w-4 h-4" />
                        {meal.time} • {meal.type}
                      </div>
                      <h4 className="text-lg font-bold text-slate-900 mb-1 truncate">
                        {meal.name}
                      </h4>
                      <p className="text-sm text-slate-500">
                        {meal.calories} kcal • {meal.ingredients.length}{' '}
                        ingredients
                      </p>
                    </div>
                    <div className="flex items-center text-slate-400">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Recipe Detail Panel */}
        <div>
          <AnimatePresence mode="wait">
            {selectedMeal ?
            <motion.div
              key={selectedMeal.name}
              initial={{
                opacity: 0,
                x: 20
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              exit={{
                opacity: 0,
                x: 20
              }}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden sticky top-24">
              
                <img
                src={selectedMeal.image}
                alt={selectedMeal.name}
                className="w-full h-48 object-cover" />
              
                <div className="p-6">
                  <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold mb-3">
                    {selectedMeal.type} • {selectedMeal.calories} kcal
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-5">
                    {selectedMeal.name}
                  </h3>

                  <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <ListChecks className="w-4 h-4 text-emerald-600" />{' '}
                    Ingredients
                  </h4>
                  <ul className="space-y-1.5 mb-6">
                    {selectedMeal.ingredients.map((ing, idx) =>
                  <li
                    key={idx}
                    className="text-sm text-slate-600 flex items-start gap-2">
                    
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                        {ing}
                      </li>
                  )}
                  </ul>

                  <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <ChefHat className="w-4 h-4 text-emerald-600" /> Preparation
                    Steps
                  </h4>
                  <div className="space-y-3">
                    {selectedMeal.steps.map((step, idx) =>
                  <div key={idx} className="flex gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold mt-0.5">
                          {idx + 1}
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {step}
                        </p>
                      </div>
                  )}
                  </div>
                </div>
              </motion.div> :

            <motion.div
              key="empty"
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
              exit={{
                opacity: 0
              }}
              className="bg-slate-50 rounded-2xl border border-dashed border-slate-300 h-full min-h-[400px] flex flex-col items-center justify-center text-slate-500 p-6 text-center sticky top-24">
              
                <Utensils className="w-12 h-12 mb-4 text-slate-300" />
                <p>
                  Select a meal from {currentDay.day}'s schedule to view
                  ingredients and step-by-step preparation.
                </p>
              </motion.div>
            }
          </AnimatePresence>
        </div>
      </div>
    </motion.div>);

}