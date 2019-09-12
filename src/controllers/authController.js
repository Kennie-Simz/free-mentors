/* eslint-disable max-len */
/* eslint-disable no-multi-str */
/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import pool from '../database';
import validateSignUpUser from './validations/signUpUser';
import validateLoginUser from './validations/loginUser';

dotenv.config();

class AuthController {
  static signUpUser(req, res) {
    const {
      firstName, lastName, email, password, bio, address, occupation, expertise,
    } = req.body;
    const { valid, errors } = validateSignUpUser(email);
    if (!valid) {
      return res.status(400).json({
        message: 'Validation errors',
        errors,
      });
    }

    // eslint-disable-next-line no-multi-str
    pool.query(
      'INSERT INTO users\
    (firstName, lastName, email, password, bio, address, occupation, expertise, level)\
      VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [firstName, lastName, email, password, bio, address, occupation, expertise, 'User'],
      (error) => {
        if (error) {
          return res.status(401).json({
            status: 401,
            message: 'Unauthorized',
            error: error.detail,
          });
        }
        const token = jwt.sign(
          {
            id: res.insertId,
            firstName,
            lastName,
            email,
            password,
            bio,
            address,
            occupation,
            expertise,
          },
          process.env.APP_SECRET,
          {
            expiresIn: '24hrs', // expires in 24 hours
          },
        );
        return res.status(201).json({
          status: 201,
          message: 'User created successfully!',
          data: {
            token,
          },
        });
      },
    );
  }

  static logUsers(req, res) {
    const { email, password } = req.body;
    const { valid, errors } = validateLoginUser(email);
    if (!valid) {
      return res.status(400).json({
        message: 'Validation errors',
        errors,
      });
    }
    pool.query('SELECT * FROM users WHERE email = $1', [email], (err, results) => {
      if (results.rowCount < 1) {
        return res.status(404).json({
          status: 404,
          error: 'Email does not exist!',
        });
      }
      if (password === results.rows[0].password) {
        const token = jwt.sign(
          {
            id: results.rows[0].id,
            email: results.rows[0].email,
            firstName: results.rows[0].firstname,
            level: results.rows[0].level,
            isAdmin: results.rows[0].isadmin,
          },
          process.env.APP_SECRET,
          {
            expiresIn: '24h', // expires in 24 hours
          },
        );
        return res.status(200).json({
          status: 200,
          data: {
            token,
          },
        });
      }
    });
  }
}

export default AuthController;
