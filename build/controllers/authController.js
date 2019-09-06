
Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

const _jsonwebtoken = _interopRequireDefault(require('jsonwebtoken'));

const _authModel = _interopRequireDefault(require('../models/authModel'));

const _config = _interopRequireDefault(require('../config'));

const _signUpUser = _interopRequireDefault(require('./validations/signUpUser'));

const _loginUser = _interopRequireDefault(require('./validations/loginUser'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _defineProperties(target, props) { for (let i = 0; i < props.length; i++) { const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

const ENV_VAR = _config.default.get(process.env.NODE_ENV);

const AuthController =
/* #__PURE__ */
(function () {
  function AuthController() {
    _classCallCheck(this, AuthController);
  }

  _createClass(AuthController, null, [{
    key: 'signUpUser',
    value: function signUpUser(req, res) {
      const newId = parseInt(_authModel.default.length, 10) + 1;
      const _req$body = req.body;
      const { email } = _req$body;
      const { firstName } = _req$body;
      const { lastName } = _req$body;
      const { password } = _req$body;
      const { bio } = _req$body;
      const { address } = _req$body;
      const { occupation } = _req$body;
      const { expertise } = _req$body;

      const _validateSignUpUser = (0, _signUpUser.default)(email);
      const { valid } = _validateSignUpUser;
      const { errors } = _validateSignUpUser;

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

      _authModel.default.push(newUser);

      const token = _jsonwebtoken.default.sign({
        id: newId,
        isAdmin,
        level,
        email,
      }, ENV_VAR.APP_SECRET, {
        expiresIn: '24h', // expires in 24 hours

      });

      return res.status(201).json({
        message: 'User created successfully!',
        data: {
          token,
          message: 'User created successfully!',
        },
      });
    },
  }, {
    key: 'logUsers',
    value: function logUsers(req, res) {
      const _req$body2 = req.body;
      const { email } = _req$body2;
      const { password } = _req$body2;

      const _validateLoginUser = (0, _loginUser.default)(email);
      const { valid } = _validateLoginUser;
      const { errors } = _validateLoginUser;

      if (!valid) {
        return res.status(400).json({
          message: 'Validation errors',
          errors,
        });
      }

      const logUser = _authModel.default.find((item) => item.email === email);

      if (logUser) {
        if (logUser.password === password) {
          const token = _jsonwebtoken.default.sign({
            id: logUser.id,
            isAdmin: logUser.isAdmin,
            level: logUser.level,
            email: logUser.email,
          }, ENV_VAR.APP_SECRET, {
            expiresIn: '24h', // expires in 24 hours

          });

          res.json({
            status: '200',
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
            status: '400',
            error: 'Password is incorrect',
          });
        }
      }
    },
  }]);

  return AuthController;
}());

const _default = AuthController;
exports.default = _default;
