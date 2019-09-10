/* eslint-disable max-len */
/* eslint-disable no-multi-str */
/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Users from '../models/authModel';
import pool from '../database';
import validateSignUpUser from './validations/signUpUser';
import validateLoginUser from './validations/loginUser';

dotenv.config();

class AuthController {
  static getUsers(res) {
    return res.json({
      message: 'List of all users',
      users: Users,
    });
  }

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
    (firstName, lastName, email, password, bio, address, occupation, expertise)\
      VALUES ( $1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [firstName, lastName, email, password, bio, address, occupation, expertise],
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
    const logUser = Users.find((item) => item.email === email);
    if (logUser) {
      if (logUser.password === password) {
        const token = jwt.sign(
          {
            id: logUser.id,
            isAdmin: logUser.isAdmin,
            level: logUser.level,
            email: logUser.email,
          },
          process.env.APP_SECRET,
          {
            expiresIn: '24h', // expires in 24 hours
          },
        );
        res.json({
          status: 200,
          message: 'User is successfully logged in!',
          data: {
            token,
            id: logUser.id,
            firstName: logUser.firstName,
            lastName: logUser.lastName,
            email: logUser.email,
          },
        });
      } else {
        res.status(400).json({
          status: 400,
          error: 'Password is incorrect',
        });
      }
    }
  }
}

export default AuthController;
