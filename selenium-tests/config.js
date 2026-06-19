import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

export const config = {
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  usersDbPath: process.env.BACKEND_DB_USERS_PATH || path.resolve('../backend/.local_db/Users.json'),
  headless: process.env.HEADLESS_MODE === 'true',
  defaultTimeout: parseInt(process.env.TIMEOUT || '10000', 10),
};

export default config;
