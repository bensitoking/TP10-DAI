import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pkg;

const DBConfigBest = {
  host     : process.env.DB_HOST,
  database : process.env.DB_DATABASE,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  port     : process.env.DB_PORT ?? 5432,
  ssl: {
    rejectUnauthorized: false, // 🔐 necesario para Supabase
  },
};

const pool = new Pool(DBConfigBest);

export default pool;