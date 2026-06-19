import { generateJSON } from './geminiService.js';

const generateLocalHealthInsightsFallback = (profile, sugarLogs = [], waterLogs = [], exerciseLogs = []) => {
  // 1. Calculate BMI
  let weight = profile.weight || 70;
  let height = profile.height || 170;
  const heightInMeters = height / 100;
  const bmi = parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(1));
  
  let bmiCategory = 'Normal weight';
  if (bmi < 18.5) bmiCategory = 'Underweight';
  else if (bmi < 25) bmiCategory = 'Normal weight';
  else if (bmi < 30) bmiCategory = 'Overweight';
  else bmiCategory = 'Obese';

  // 2. Base Health Score
  let healthScore = 90;
  if (bmiCategory === 'Obese') healthScore -= 15;
  else if (bmiCategory === 'Overweight') healthScore -= 8;
  else if (bmiCategory === 'Underweight') healthScore -= 5;

  if (profile.activityLevel === 'Sedentary') healthScore -= 10;
  else if (profile.activityLevel === 'Lightly Active') healthScore -= 5;

  // 3. Glucose Deductions
  let latestClassification = 'NORMAL';
  let riskLevel = 'Low';
  let trendMessage = 'Maintain regular tracking to observe blood sugar trends.';

  if (sugarLogs && sugarLogs.length > 0) {
    const latest = sugarLogs[0];
    const val = parseFloat(latest.value);
    
    if (latest.type === 'fasting') {
      if (val >= 126) {
        latestClassification = 'HIGH DIABETES RISK';
        riskLevel = 'High';
        healthScore -= 25;
      } else if (val >= 100) {
        latestClassification = 'PREDIABETIC';
        riskLevel = 'Medium';
        healthScore -= 10;
      }
    } else {
      if (val >= 200) {
        latestClassification = 'HIGH DIABETES RISK';
        riskLevel = 'High';
        healthScore -= 25;
      } else if (val >= 140) {
        latestClassification = 'PREDIABETIC';
        riskLevel = 'Medium';
        healthScore -= 10;
      }
    }

    if (riskLevel === 'High') {
      trendMessage = `Your latest sugar level of ${latest.value} mg/dL (${latest.type}) is high. Minimize fast carbs and perform light exercise to bring it down.`;
    } else if (riskLevel === 'Medium') {
      trendMessage = `Your latest sugar reading of ${latest.value} mg/dL is slightly elevated (Prediabetic). Focus on fiber and activity.`;
    } else {
      trendMessage = `Excellent! Your latest reading is within normal range (${latest.value} mg/dL). Keep maintaining this healthy trend.`;
    }
  }

  // Bound score
  healthScore = Math.max(20, Math.min(100, healthScore));

  // 4. Generate recommendations
  const tips = [];
  const dietSuggestions = [];
  const exerciseSuggestions = [];

  if (riskLevel === 'High') {
    tips.push('Walk for 15 minutes immediately after your heaviest meals.');
    tips.push('Drink plenty of water to help kidneys flush excess glucose.');
    tips.push('Limit simple carbohydrates, juices, and sugars immediately.');
    dietSuggestions.push('Incorporate high-fiber foods like broccoli, leafy greens, chia seeds, and tofu.');
    dietSuggestions.push('Avoid white bread, white rice, sweetened drinks, and potatoes.');
    exerciseSuggestions.push('Complete 45 minutes of daily brisk walking or low-impact cardio.');
    exerciseSuggestions.push('Practice daily stretching or light yoga to manage stress levels.');
  } else if (riskLevel === 'Medium') {
    tips.push('Ensure 150 minutes of moderate activity weekly.');
    tips.push('Space meals consistently to avoid sudden insulin demand.');
    tips.push('Incorporate strength training to act as a glucose sink.');
    dietSuggestions.push('Switch to complex carbs like Quinoa, Brown Rice, and Oats.');
    dietSuggestions.push('Include high protein components (paneer, lentils) with every meal.');
    exerciseSuggestions.push('Do a 30-minute brisk walk or dynamic home workout daily.');
    exerciseSuggestions.push('Engage in 2 light resistance training sessions per week.');
  } else {
    tips.push('Maintain regular meal schedules to support consistent glucose.');
    tips.push('Stay hydrated with at least 8-10 glasses of water daily.');
    tips.push('Keep recording logs regularly to monitor daily patterns.');
    dietSuggestions.push('Enjoy a balanced diet with clean proteins, vegetables, and whole grains.');
    dietSuggestions.push('Add healthy snacks like almonds or walnuts to curb cravings.');
    exerciseSuggestions.push('Keep up your current active lifestyle with light stretching.');
    exerciseSuggestions.push('Try interval pacing (alternating walk/jog segments) to boost fitness.');
  }

  return {
    healthScore,
    trendMessage,
    tips,
    dietSuggestions,
    exerciseSuggestions
  };
};

export const generateHealthInsights = async (profile, sugarLogs = [], waterLogs = [], exerciseLogs = []) => {
  try {
    const prompt = `You are a clinical metabolic health specialist and endocrinology assistant.
Analyze the patient's biometric parameters and tracking history below to generate clinical recommendations, a trend alert message, and a refined overall health score (from 20 to 100).

Patient Profile:
- Age: ${profile.age}
- Gender: ${profile.gender}
- Height: ${profile.height}cm
- Weight: ${profile.weight}kg
- Activity Level: ${profile.activityLevel}
- Diabetes Type: ${profile.diabetesType}
- Medical details: "${profile.medicalNotes}"

Glucose Readings (Last 10 logs):
${sugarLogs.slice(0, 10).map(l => `- Glucose: ${l.value} mg/dL (${l.type}) logged at ${l.createdAt}`).join('\n')}

Water Consumption (Last 5 logs):
${waterLogs.slice(0, 5).map(w => `- Hydration: ${w.intakeMl}mL logged on ${w.date}`).join('\n')}

Physical Exercise (Last 5 logs):
${exerciseLogs.slice(0, 5).map(e => `- Exercise: ${e.name} for ${e.durationMinutes} mins (burned ${e.caloriesBurned} kcal) logged at ${e.createdAt}`).join('\n')}

Requirements:
1. Formulate a refined overall "healthScore" (out of 100) that decreases with high glucose trends and sedentary activity, and increases with compliance in hydration and workouts.
2. Formulate a personalized "trendMessage" summarizing the patient's blood sugar logs, noting improvements or spikes.
3. Generate 3 personalized "tips" (actionable actions checklist).
4. Generate 2 "dietSuggestions" tailored to their profile and latest logs.
5. Generate 2 "exerciseSuggestions" matching their physical activity profile.

Format the response EXACTLY as a JSON object matching this structure:
{
  "healthScore": 82,
  "trendMessage": "Your blood sugar levels show slight postprandial elevations. Keep tracking and walk 15 mins post meal.",
  "tips": [
    "Tip 1...",
    "Tip 2...",
    "Tip 3..."
  ],
  "dietSuggestions": [
    "Suggestion 1...",
    "Suggestion 2..."
  ],
  "exerciseSuggestions": [
    "Suggestion 1...",
    "Suggestion 2..."
  ]
}

Return ONLY the valid JSON response, no markdown wrapping.`;

    const insights = await generateJSON(prompt);
    if (insights) return insights;
  } catch (error) {
    console.warn('Gemini generateHealthInsights failed. Using local rule-based fallback generator:', error.message);
  }

  return generateLocalHealthInsightsFallback(profile, sugarLogs, waterLogs, exerciseLogs);
};

