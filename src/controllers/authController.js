import jwt from 'jsonwebtoken';
import Users from '../models/authModel';
import config from '../config';

const ENV_VAR = config.get(process.env.NODE_ENV);

class AuthController {
  static signUpUser(req, res) {
    const newId = parseInt(Users.length, 10) + 1;
    const {
      email, firstName, lastName, password, bio, address, occupation, expertise,
    } = req.body;
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
      is_admin: false,
    };
    Users.push(newUser);
    const token = jwt.sign({ id: newId }, ENV_VAR.APP_SECRET, {
      expiresIn: '24h', // expires in 24 hours
    });
    return res.status(201).json({
      message: 'User created successfully!',
      data: {
        token,
        message: 'User created successfully!',
      },
    });
  }
}

export default AuthController;
