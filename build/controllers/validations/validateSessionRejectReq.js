
Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

const _authModel = _interopRequireDefault(require('../../models/authModel'));

const _sessionModel = _interopRequireDefault(require('../../models/sessionModel'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const validateMentorId = function validateMentorId(mentorId, sessionId) {
  const errors = {};

  const mentorExists = _authModel.default.find((item) => item.id === Number(mentorId));

  const sessionExists = _sessionModel.default.find((item) => item.sessionId === Number(sessionId));

  if (!mentorExists) {
    errors.mentorId = 'User with ID '.concat(mentorId, ' not found');
  } else if (mentorExists.level !== 'Mentor') {
    errors.mentorId = 'User with ID '.concat(mentorId, ' is not a mentor');
  }

  if (!sessionExists) {
    errors.sessionId = 'Session with ID '.concat(sessionId, ' not found');
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

const _default = validateMentorId;
exports.default = _default;
