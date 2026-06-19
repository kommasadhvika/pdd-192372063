import React, { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Camera, Save, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { DiabetesType } from '../types';
export function Profile() {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    fullName: user?.profile.fullName || '',
    age: user?.profile.age || '',
    gender: user?.profile.gender || 'Other',
    height: user?.profile.height || '',
    weight: user?.profile.weight || '',
    diabetesType: user?.profile.diabetesType || 'None',
    diagnosisDate: user?.profile.diagnosisDate || '',
    emergencyContact: user?.profile.emergencyContact || ''
  });
  const [avatarPreview, setAvatarPreview] = useState(
    user?.profile.avatarUrl || ''
  );
  const [isSaved, setIsSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const calculateBMI = () => {
    if (formData.height && formData.weight) {
      const heightInMeters = Number(formData.height) / 100;
      const bmi = Number(formData.weight) / (heightInMeters * heightInMeters);
      return bmi.toFixed(1);
    }
    return null;
  };
  const bmi = calculateBMI();
  let bmiCategory = '';
  let bmiColor = '';
  if (bmi) {
    const bmiNum = Number(bmi);
    if (bmiNum < 18.5) {
      bmiCategory = 'Underweight';
      bmiColor = 'text-blue-600';
    } else if (bmiNum < 25) {
      bmiCategory = 'Normal';
      bmiColor = 'text-emerald-600';
    } else if (bmiNum < 30) {
      bmiCategory = 'Overweight';
      bmiColor = 'text-orange-600';
    } else {
      bmiCategory = 'Obese';
      bmiColor = 'text-red-600';
    }
  }
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      ...formData,
      age: formData.age ? Number(formData.age) : undefined,
      height: formData.height ? Number(formData.height) : undefined,
      weight: formData.weight ? Number(formData.weight) : undefined,
      avatarUrl: avatarPreview
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
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
      className="max-w-3xl mx-auto">
      
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Personal Profile</h1>
        <p className="text-slate-500">
          Manage your health details to get personalized AI recommendations.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        
        <div className="p-6 sm:p-8 border-b border-slate-100 flex flex-col sm:flex-row items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-slate-100 border-4 border-white shadow-md overflow-hidden flex items-center justify-center">
              {avatarPreview ?
              <img
                src={avatarPreview}
                alt="Profile"
                className="w-full h-full object-cover" /> :


              <span className="text-3xl font-bold text-slate-400">
                  {formData.fullName.charAt(0) || 'U'}
                </span>
              }
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 bg-emerald-600 text-white p-2 rounded-full shadow-lg hover:bg-emerald-700 transition-colors">
              
              <Camera className="w-4 h-4" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden" />
            
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-bold text-slate-900">
              {formData.fullName || 'Your Name'}
            </h2>
            <p className="text-slate-500">{user?.email}</p>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          {/* Basic Info */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              Basic Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    fullName: e.target.value
                  })
                  }
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
                
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Age
                </label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    age: e.target.value
                  })
                  }
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
                
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Gender
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    gender: e.target.value as any
                  })
                  }
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none">
                  
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Emergency Contact
                </label>
                <input
                  type="tel"
                  value={formData.emergencyContact}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    emergencyContact: e.target.value
                  })
                  }
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  placeholder="+1 (555) 000-0000" />
                
              </div>
            </div>
          </div>

          {/* Physical Metrics */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Physical Metrics
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    height: e.target.value
                  })
                  }
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
                
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    weight: e.target.value
                  })
                  }
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
                
              </div>
            </div>
            {bmi &&
            <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3">
                <AlertCircle className={`w-5 h-5 ${bmiColor}`} />
                <div>
                  <span className="text-sm text-slate-500">
                    Calculated BMI:{' '}
                  </span>
                  <span className="font-bold text-slate-900">{bmi}</span>
                  <span className={`ml-2 text-sm font-medium ${bmiColor}`}>
                    ({bmiCategory})
                  </span>
                </div>
              </div>
            }
          </div>

          {/* Medical Details */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Medical Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Diabetes Type
                </label>
                <select
                  value={formData.diabetesType}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    diabetesType: e.target.value as DiabetesType
                  })
                  }
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none">
                  
                  <option value="None">None / Not Sure</option>
                  <option value="Type 1">Type 1</option>
                  <option value="Type 2">Type 2</option>
                  <option value="Pre-diabetic">Pre-diabetic</option>
                  <option value="Gestational">Gestational</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Date of Diagnosis
                </label>
                <input
                  type="date"
                  value={formData.diagnosisDate}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    diagnosisDate: e.target.value
                  })
                  }
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
                
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span
            className={`text-sm font-medium text-emerald-600 transition-opacity ${isSaved ? 'opacity-100' : 'opacity-0'}`}>
            
            Profile saved successfully!
          </span>
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors flex items-center gap-2">
            
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </form>
    </motion.div>);

}