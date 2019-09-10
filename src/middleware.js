/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers.authorization; // Express headers are auto converted to lowercase

  if (token === undefined || token === null) {
    return res.json({
      status: 'failed',
      message: 'No token provided',
    });
  }
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid',
        });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    /* istanbul ignore next */
    return res.json({
      success: false,
      message: 'Auth token is not supplied',
    });
  }
};

export default checkToken;
