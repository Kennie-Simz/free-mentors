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
     bio  VARCHAR(255) NOT NULL,
     occupation  VARCHAR(255) NOT NULL,
     expertise  VARCHAR(255) NOT NULL,
     isAdmin boolean DEFAULT false,
     createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   )`;

  await pool.query(dropTables);
  console.log('Dropping tables');
  await pool.query(users);
  console.log('users created');
})();
