/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
import User from '../models/authModel';
import pool from '../database/index';

class UserController {
  static allUsers(req, res) {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        return res.status(404).json({
          status: 404,
          message: 'Users not found',
        });
      }
      return res.json({
        message: 'Users',
        users: results.rows,
      });
    });
  }

  // eslint-disable-next-line consistent-return
  static userToMentor(req, res) {
    const { isAdmin } = req.decoded;
    if (!isAdmin) {
      return res.status(401).json({
        status: 401,
        message: 'Only admin can change to mentor',
      });
    }
    const { userId } = req.params;

    pool.query('SELECT * FROM users WHERE ID = $1', [userId], (err, results) => {
      if (results.rowCount < 1) {
        return res.status(404).json({
          status: 404,
          error: `User with ID ${userId} not found`,
        });
      }
      pool.query('UPDATE users SET level = $1 WHERE id = $2', ['Mentor', userId], (error, output) => res.json({
        status: 200,
        data: {
          message: 'User is now a mentor',
        },
      }));
    });
  }
}

export default UserController;
