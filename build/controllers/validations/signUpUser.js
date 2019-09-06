
Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

const _authModel = _interopRequireDefault(require('../../models/authModel'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const validateSignUpUser = function validateSignUpUser(email) {
  const errors = {};

  const emailExists = _authModel.default.find((item) => item.email === email);

  if (emailExists) {
    errors.email = 'email already exists';
  } else if (email.trim() === '') {
    errors.email = 'email is required';
  } else {
    // Letters, numbers and underscore
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

const _default = validateSignUpUser;
exports.default = _default;
