/* import pool from '../database/index';

const checkEmailExists = (email) => {
  pool.query('SELECT * FROM users WHERE email = $1', [email], (error, res) => {
    if (error) {
      throw error;
    }
    return 'hello';
  });
};

console.log('**** testing is: ', checkEmailExists('maybach@acde.com'));

export { checkEmailExists }; */
