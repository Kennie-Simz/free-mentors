
Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

const _jsonwebtoken = _interopRequireDefault(require('jsonwebtoken'));

const _config = _interopRequireDefault(require('./config'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable consistent-return */
const ENV_VAR = _config.default.get(process.env.NODE_ENV);

const checkToken = function checkToken(req, res, next) {
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
    _jsonwebtoken.default.verify(token, ENV_VAR.APP_SECRET, (err, decoded) => {
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

const _default = checkToken;
exports.default = _default;
