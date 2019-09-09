/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import Users from '../models/authModel';
import config from '../config';
import validateSignUpUser from './validations/signUpUser';
import validateLoginUser from './validations/loginUser';

const ENV_VAR = config.get(process.env.NODE_ENV);

class AuthController {
  static signUpUser(req, res) {
    const newId = parseInt(Users.length, 10) + 1;
    const {
      email, firstName, lastName, password, bio, address, occupation, expertise,
    } = req.body;

    const { valid, errors } = validateSignUpUser(email);
    if (!valid) {
      return res.status(400).json({
        message: 'Validation errors',
        errors,
      });
    }
    const isAdmin = false;
    const level = 'User';
    const newUser = {
      id: newId,
      email,
      firstName,
      lastName,
      password,
      bio,
      address,
      occupation,
      expertise,
      isAdmin,
      level,
    };
    Users.push(newUser);
    const token = jwt.sign(
      {
        id: newId,
        isAdmin,
        level,
        email,
      },
      ENV_VAR.APP_SECRET,
      {
        expiresIn: '24h', // expires in 24 hours
      },
    );
    return res.status(201).json({
      status: 201,
      message: 'User created successfully!',
      data: {
        token,
        message: 'User created successfully!',
      },
    });
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
          ENV_VAR.APP_SECRET,
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
