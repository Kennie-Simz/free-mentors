import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString,
});

export default pool;

// import { Pool } from 'pg';

// const conn = {
//   user: process.env.DB_USER || 'kennedy',
//   host: process.env.DB_HOST || 'localhost',
//   database: process.env.DB_NAME || 'freementors',
//   password: process.env.DB_PASS || 'password',
//   port: 5432,
// };

// const pool = new Pool(conn);
