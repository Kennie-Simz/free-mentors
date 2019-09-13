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
  pool.query(
    'INSERT INTO users\
    (firstName, lastName, email, password, bio, address, occupation, expertise, isAdmin)\
      VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
    [
      'Mentor',
      'Mentor',
      'mentor@mentor.com',
      'password',
      'bio goes here',
      'address goes here',
      'Mentor',
      'Mentor',
      false,
    ],
    (error) => {
      if (error) {
        console.log('Error adding mentor: ', error.detail);
      } else {
        console.log('Default Mentor added');
      }
    },
  );
  pool.query(
    'INSERT INTO users\
    (firstName, lastName, email, password, bio, address, occupation, expertise, isAdmin)\
      VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
    [
      'User',
      'User',
      'user@user.com',
      'password',
      'bio goes here',
      'address goes here',
      'User',
      'User',
      true,
    ],
    (error) => {
      if (error) {
        console.log('Error adding User: ', error.detail);
      } else {
        console.log('Default User added');
      }
    },
  );
})();
