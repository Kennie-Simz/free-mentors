
Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

const _authModel = _interopRequireDefault(require('../../models/authModel'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createMentorshipRequest = function createMentorshipRequest(mentorId) {
  const errors = {};

  const mentorExists = _authModel.default.find((item) => item.id === Number(mentorId));

  if (!mentorExists) {
    errors.mentorId = 'User with ID '.concat(mentorId, ' not found');
  } else if (mentorExists.level !== 'Mentor') {
    errors.mentorId = 'User with ID '.concat(mentorId, ' is not a mentor');
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

const _default = createMentorshipRequest;
exports.default = _default;
