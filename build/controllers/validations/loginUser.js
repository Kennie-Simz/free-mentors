
Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

const _authModel = _interopRequireDefault(require('../../models/authModel'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const loginUser = function loginUser(email) {
  const errors = {};

  const emailExists = _authModel.default.find((item) => item.email === email);

  if (!emailExists) {
    errors.email = 'email does not exist';
  } else {
    const regEx = /\S+@\S+\.\S+/;

    if (!email.trim().match(regEx)) {
      errors.email = 'Invalid email';
    }
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

const _default = loginUser;
exports.default = _default;
