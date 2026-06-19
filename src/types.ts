export type DiabetesType =
'Type 1' |
'Type 2' |
'Pre-diabetic' |
'Gestational' |
'None';

export interface UserProfile {
  fullName: string;
  age?: number;
  gender?: 'Male' | 'Female' | 'Other';
  height?: number; // cm
  weight?: number; // kg
  diabetesType?: DiabetesType;
  diagnosisDate?: string;
  emergencyContact?: string;
  avatarUrl?: string;
}

export interface User {
  id: string;
  email: string;
  password?: string; // Stored in local storage for demo purposes
  profile: UserProfile;
}

export type ReadingType =
'Fasting' |
'Before Meal' |
'After Meal' |
'Random' |
'Bedtime';

export interface SugarReading {
  id: string;
  userId: string;
  value: number;
  type: ReadingType;
  date: string;
  time: string;
  notes?: string;
}

export type DietPreference = {
  isIndian: boolean;
  isVeg: boolean;
};