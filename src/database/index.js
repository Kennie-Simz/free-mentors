import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'free-mentors',
  password: '0703625710',
  port: 5433,
});

export default pool;
