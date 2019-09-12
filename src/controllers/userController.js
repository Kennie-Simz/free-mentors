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

  static userToMentor(req, res) {
    const { isAdmin } = req.decoded;
    if (!isAdmin) {
      return res.status(401).json({
        status: 401,
        message: 'Only admin can change to mentor',
      });
    }
    const { userId } = req.params;

    const user = User.find((item) => item.id === Number(userId));
    if (!user) {
      res.status(404).json({
        status: 404,
        error: 'user not found',
      });
    }
    user.level = 'Mentor';
    return res.status(201).json({
      status: 201,
      data: user,
    });
  }
}

export default UserController;
