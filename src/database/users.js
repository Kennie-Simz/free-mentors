/* eslint-disable no-multi-str */
/* eslint-disable no-console */
import pool from './index';

// self invoking async function
(async () => {
  pool.query(
    'INSERT INTO users\
    (firstName, lastName, email, password, bio, address, occupation, expertise, isAdmin)\
      VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
    [
      'Admin',
      'Admin',
      'admin@admin.com',
      'password',
      'bio goes here',
      'address goes here',
      'Admin',
      'Admin',
      true,
    ],
    (error) => {
      if (error) {
        console.log('Error adding admin: ', error.detail);
      } else {
        console.log('Default Admin added');
      }
    },
  );
})();
