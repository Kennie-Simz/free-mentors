import { Pool } from 'pg';
import {
  DB_USER, DB_HOST, DB_NAME, DB_PASS, DB_PORT,
} from '../config';

const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASS,
  port: DB_PORT,
});

export default pool;
