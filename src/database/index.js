import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString,
});

const runner = async (query) => {
  const result = await pool.query(query);
  return result.rows || result;
};

export { runner, pool };
