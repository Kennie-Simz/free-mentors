
Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

const _authModel = _interopRequireDefault(require('../models/authModel'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _defineProperties(target, props) { for (let i = 0; i < props.length; i++) { const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

const MentorsController =
/* #__PURE__ */
(function () {
  function MentorsController() {
    _classCallCheck(this, MentorsController);
  }

  _createClass(MentorsController, null, [{
    key: 'allMentors',
    value: function allMentors(req, res) {
      const mentors = _authModel.default.find((value) => value.level === 'Mentor');

      if (!mentors) {
        return res.status(404).json({
          status: 404,
          message: 'No mentors found',
        });
      }

      return res.status(200).json({
        status: 200,
        message: 'Mentors',
        data: mentors,
      });
    },
  }, {
    key: 'getSingleMentor',
    value: function getSingleMentor(req, res) {
      const { mentorId } = req.params;

      const mentor = _authModel.default.find((value) => value.id === Number(mentorId));

      if (!mentor) {
        return res.status(404).json({
          message: 'Error',
          error: 'User not found',
        });
      }

      if (mentor.level === 'Mentor') {
        return res.status(200).json({
          status: 200,
          message: 'Mentor',
          data: mentor,
        });
      }

      return res.status(404).json({
        status: 404,
        message: 'Given ID does not belong to a mentor',
      });
    },
  }]);

  return MentorsController;
}());

const _default = MentorsController;
exports.default = _default;
