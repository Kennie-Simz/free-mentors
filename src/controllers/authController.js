/* eslint-disable no-multi-str */
/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import Users from '../models/authModel';
import { APP_SECRET } from '../config';
import pool from '../database';

class AuthController {
  static getUsers(req, res) {
    return res.json({
      message: 'List of all users',
      users: Users,
    });
  }

  static signUpUser(req, res) {
    const {
      firstName, lastName, email, password, bio, address, occupation, expertise,
    } = req.body;
    // eslint-disable-next-line no-multi-str
    pool.query(
      'INSERT INTO users\
    (firstName, lastName, email, password, bio, address, occupation, expertise)\
      VALUES ( $1, $2, $3, $4, $5, $6, $7, $8)',
      [firstName, lastName, email, password, bio, address, occupation, expertise],
      (error, results) => {
        if (error) {
          return res.status(401).json({
            status: 401,
            message: 'Unauthorized',
            error: error.detail,
          });
        }
        const token = jwt.sign({ id: res.insertId, email, firstName }, APP_SECRET, {
          expiresIn: '24hrs', // expires in 24 hours
        });
        return res.status(201).json({
          status: 201,
          message: 'User created successfully!',
          data: {
            token,
            id: results.insertId,
            firstName,
            lastName,
            email,
          },
        });
      },
    );
  }
}

export default AuthController;
