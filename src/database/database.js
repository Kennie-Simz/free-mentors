/* eslint-disable no-console */
import pool from './index';

// self invoking async function
(async () => {
  const dropTables = 'DROP TABLE IF EXISTS users, mentors, sessions';

  const users = `CREATE TABLE IF NOT EXISTS users (
     id serial PRIMARY KEY,
     firstName VARCHAR(255) NOT NULL,
     lastName  VARCHAR(255) NOT NULL,
     email  VARCHAR(255) NOT NULL UNIQUE,
     password  VARCHAR(255) NOT NULL,
     address  VARCHAR(255) NOT NULL,
     bio  VARCHAR(255) NOT NULL UNIQUE,
     occupation  VARCHAR(255) NOT NULL,
     isAdmin boolean DEFAULT false,
     createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   )`;

  const mentors = `CREATE TABLE IF NOT EXISTS mentors (
     id serial PRIMARY KEY,
     firstName VARCHAR(255) NOT NULL,
     lastName  VARCHAR(255) NOT NULL,
     email  VARCHAR(255) NOT NULL UNIQUE,
     password  VARCHAR(255) NOT NULL,
     address  VARCHAR(255) NOT NULL,
     bio  VARCHAR(255) NOT NULL,
     occupation  VARCHAR(255) NOT NULL,
     isAdmin boolean DEFAULT false,
     createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   )`;
  const session = `CREATE TABLE IF NOT EXISTS mentors (
     id serial PRIMARY KEY,
     mentorId VARCHAR(255) NOT NULL UNIQUE,
     menteeId  VARCHAR(255) NOT NULL UNIQUE,
     questions  VARCHAR(255) NOT NULL,
     menteeEmail  VARCHAR(255) NOT NULL UNIQUE,
     status  VARCHAR(255) NOT NULL,
     createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   )`;

  await pool.query(dropTables);
  console.log('Dropping tables');
  await pool.query(users);
  console.log('users created');
  await pool.query(mentors);
  console.log('upgraded to mentor!');
  await pool.query(session);
  console.log('session created!');
})();
