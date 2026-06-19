import { generateText, isMockAI } from './geminiService.js';

const generateLocalChatbotReply = (message, profile, sugarLogs) => {
  const lowerMsg = message.toLowerCase();
  const name = profile ? profile.fullName || 'User' : 'there';
  const disclaimer = `\n\n*Disclaimer: I am DiaPredict AI, an automated health advisor. My suggestions are informational and do not replace professional medical advice. Please coordinate with your doctor before modifying your care regimen.*`;

  // GREETINGS
  if (lowerMsg.match(/\b(hi|hello|hey|greetings|morning|afternoon|evening)\b/)) {
    let reply = `Hello ${name}! I am your DiaPredict AI Advisor. How can I help you manage your diabetes today? `;
    if (profile) {
      reply += `I have reviewed your profile and see you are managing ${profile.diabetesType || 'diabetes'}. Let me know if you want to discuss your diet, workouts, or sugar levels!`;
    } else {
      reply += `Please complete your profile metrics so I can give you personalized suggestions!`;
    }
    return reply + disclaimer;
  }

  // SUGAR LOGS AND GLUCOSE
  if (lowerMsg.includes('sugar') || lowerMsg.includes('glucose') || lowerMsg.includes('reading') || lowerMsg.includes('level') || lowerMsg.includes('blood')) {
    if (sugarLogs && sugarLogs.length > 0) {
      const latest = sugarLogs[0];
      let reply = `Your latest blood sugar reading was **${latest.value} mg/dL** (${latest.type}), classified as **${latest.classification}** (Risk: ${latest.riskLevel}).\n\n`;
      
      if (latest.riskLevel === 'High') {
        reply += `🚨 **Attention:** Your level is elevated. To help manage high glucose levels:\n` +
                 `- Sip warm water to help your kidneys flush excess glucose.\n` +
                 `- Take a gentle 15-20 minute walk immediately after meals to improve muscle insulin uptake.\n` +
                 `- Avoid all high-glycemic carbohydrates (refined sugar, white flour, fruit juices, and potatoes).\n` +
                 `- Monitor for any symptoms like extreme thirst or confusion.`;
      } else if (latest.riskLevel === 'Medium') {
        reply += `⚠️ **Note:** Your reading is in the Prediabetic range. To keep it stable:\n` +
                 `- Increase dietary fiber (leafy greens, chia seeds, oats).\n` +
                 `- Maintain 30 minutes of daily moderate activity.\n` +
                 `- Try to keep consistent spacing between your meals.`;
      } else {
        reply += `✅ **Great job!** Your blood sugar is currently in the normal target range. Keep up your active routine and balanced diet to maintain this trend!`;
      }
      return reply + disclaimer;
    } else {
      return `I don't see any logged blood sugar readings in your account yet. Try adding one on the **Sugar Tracking** page! Once logged, I will analyze the values and suggest target modifications.` + disclaimer;
    }
  }

  // DIET AND MEALS
  if (lowerMsg.includes('diet') || lowerMsg.includes('food') || lowerMsg.includes('eat') || lowerMsg.includes('meal') || lowerMsg.includes('breakfast') || lowerMsg.includes('lunch') || lowerMsg.includes('dinner') || lowerMsg.includes('snack')) {
    let calorieText = profile ? `${Math.round(profile.weight * 35 * 0.9)} kcal` : 'your target calories';
    let reply = `For glycemic control, focus on **Low Glycemic Index (GI)** foods. Here is my dietary advice for you:\n\n` +
                `1. **Complex Carbohydrates:** Choose whole grains like Quinoa, Oats, Millets, and Brown Rice instead of white rice or refined flour.\n` +
                `2. **Proteins & Healthy Fats:** Incorporate lean proteins (Tofu, Paneer, Lentils, Fish) and healthy fats (Almonds, Walnuts, Chia seeds) to slow glucose absorption.\n` +
                `3. **Fibers:** Half of your plate should consist of leafy green vegetables, broccoli, or cucumber salads.\n\n` +
                `Your current profile indicates a target calorie intake of approximately **${calorieText}**. You can view your structured meals on the **Diet Plan** tab!`;
    return reply + disclaimer;
  }

  // EXERCISE AND WORKOUTS
  if (lowerMsg.includes('exercise') || lowerMsg.includes('workout') || lowerMsg.includes('walk') || lowerMsg.includes('run') || lowerMsg.includes('active') || lowerMsg.includes('training')) {
    let reply = `Physical activity acts as a glucose sink by allowing muscles to absorb sugar directly for fuel. My exercise recommendations:\n\n` +
                `- **Aerobic Exercise:** Aim for at least 150 minutes of moderate activity (like brisk walking or swimming) per week.\n` +
                `- **Resistance Training:** Do 2 sessions per week (bodyweight squats, yoga, light dumbbells) to build muscle mass, which enhances overall insulin sensitivity.\n` +
                `- **Timing:** Walking for 10-15 minutes immediately after meals is highly effective in flattening post-meal glucose spikes.`;
    return reply + disclaimer;
  }

  // WATER AND HYDRATION
  if (lowerMsg.includes('water') || lowerMsg.includes('hydration') || lowerMsg.includes('drink') || lowerMsg.includes('ml') || lowerMsg.includes('liter')) {
    const targetL = profile ? parseFloat(((profile.weight * 35) / 1000).toFixed(1)) : '2.5';
    let reply = `Proper hydration is essential for diabetes management because water increases blood volume, helping dilute and flush excess glucose through urine.\n\n` +
                `Your calculated daily intake target is **${targetL} Liters**. Try logging your water glasses on the **Water Tracker** to meet this goal!`;
    return reply + disclaimer;
  }

  // BMI AND WEIGHT
  if (lowerMsg.includes('weight') || lowerMsg.includes('height') || lowerMsg.includes('bmi') || lowerMsg.includes('obese') || lowerMsg.includes('overweight')) {
    if (profile) {
      const heightInM = profile.height / 100;
      const bmi = parseFloat((profile.weight / (heightInM * heightInM)).toFixed(1));
      let category = 'Normal weight';
      if (bmi < 18.5) category = 'Underweight';
      else if (bmi < 25) category = 'Normal weight';
      else if (bmi < 30) category = 'Overweight';
      else category = 'Obese';

      let reply = `According to your physiological metrics:\n` +
                  `- Weight: **${profile.weight} kg**\n` +
                  `- Height: **${profile.height} cm**\n` +
                  `- BMI: **${bmi}** (Category: **${category}**)\n\n`;
      if (bmi >= 25) {
        reply += `Losing even 5-7% of excess body weight can improve your body's insulin response and lower HbA1c levels. Focus on a slight caloric deficit and increasing daily step count.`;
      } else {
        reply += `Your BMI is in a healthy range. Keep focusing on structured meals and active training to maintain metabolic wellness.`;
      }
      return reply + disclaimer;
    } else {
      return `Please fill out your biological stats in the User Profile tab so I can calculate your BMI and recommend weight management goals.` + disclaimer;
    }
  }

  // DEFAULT REPLY
  let reply = `I have received your message: "${message}". As your DiaPredict AI Advisor, I am here to assist you with diabetes management.\n\n` +
              `You can ask me questions about:\n` +
              `- Your blood sugar log history and glycemic status.\n` +
              `- Meal guidelines, calorie limits, and grocery choices.\n` +
              `- Exercise training schedules and how to control spikes.\n` +
              `- Hydration benefits and daily targets.`;
  return reply + disclaimer;
};

export const getChatbotResponse = async (message, historyList = [], profile = null, sugarLogs = []) => {
  const profileSummary = profile 
    ? `Patient details: Name: ${profile.fullName}, Age: ${profile.age}, Gender: ${profile.gender}, Height: ${profile.height}cm, Weight: ${profile.weight}kg, Activity Level: ${profile.activityLevel}, Diabetes Type: ${profile.diabetesType}, Diagnosis notes: "${profile.medicalNotes}".`
    : 'Patient profile parameters are incomplete.';

  const recentGlucose = sugarLogs.length > 0
    ? `Recent Blood Sugar logs: ${sugarLogs.slice(0, 5).map(log => `${log.value} mg/dL (${log.type}) logged at ${log.createdAt}`).join(', ')}.`
    : 'No blood glucose logs recorded yet.';

  try {
    // Construct system instructions
    const systemPrompt = `You are "DiaPredict AI Advisor", a world-class clinical endocrinology AI chatbot specialized in diabetes management.
Guidelines:
1. Tailor your answers directly to the user's specific biometrics, activity, and glucose parameters provided below.
2. Keep responses highly actionable, scientific, clear, and empathetic.
3. If they ask clinical questions or ask about sugar logs, review the logs list provided.
4. IMPORTANT: Always include a friendly medical disclaimer at the bottom of your answer stating that your inputs are informational and they should coordinate with their doctor.

Context:
${profileSummary}
${recentGlucose}

Chat History:
${historyList.slice(-8).map(h => `${h.sender === 'user' ? 'User' : 'Assistant'}: ${h.message}`).join('\n')}
User: ${message}
Assistant:`;

    return await generateText(systemPrompt);
  } catch (error) {
    console.warn('Gemini chatbot generateText failed. Using local keyword fallback engine:', error.message);
    return generateLocalChatbotReply(message, profile, sugarLogs);
  }
};
