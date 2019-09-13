/* eslint-disable no-console */
import pool from './index';
// self invoking async function
const tables = async () => {
  const dropTables = 'DROP TABLE IF EXISTS users, sessions';

  const users = `CREATE TABLE IF NOT EXISTS users (
    id serial PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName  VARCHAR(255) NOT NULL,
    email  VARCHAR(255) NOT NULL UNIQUE,
    password  VARCHAR(255) NOT NULL,
    address  VARCHAR(255) NOT NULL,
    bio  VARCHAR(255) NOT NULL,
    occupation  VARCHAR(255) NOT NULL,
    expertise  VARCHAR(255) NOT NULL,
    level VARCHAR(255),
    isAdmin boolean DEFAULT false,
    createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   )`;
  const sessions = `CREATE TABLE IF NOT EXISTS sessions (
    id serial PRIMARY KEY,
    mentorId  VARCHAR(255) NOT NULL,
    menteeId  VARCHAR(255) NOT NULL DEFAULT 'available',
    questions  VARCHAR(255) NOT NULL,
    menteeEmail VARCHAR(255) NOT NULL,
    status TEXT DEFAULT 'pending',
    createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`;

  await pool.query(dropTables);
  console.log('Dropping tables');
  await pool.query(users);
  console.log('users created');
  await pool.query(sessions);
  console.log('session created');
};
tables();
