
Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

const _sessionModel = _interopRequireDefault(require('../models/sessionModel'));

const _createMentorshipRequest = _interopRequireDefault(require('./validations/createMentorshipRequest'));

const _validateSessionAcceptReq = _interopRequireDefault(require('./validations/validateSessionAcceptReq'));

const _validateSessionRejectReq = _interopRequireDefault(require('./validations/validateSessionRejectReq'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _defineProperties(target, props) { for (let i = 0; i < props.length; i++) { const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

const SessionController =
/* #__PURE__ */
(function () {
  function SessionController() {
    _classCallCheck(this, SessionController);
  }

  _createClass(SessionController, null, [{
    key: 'createMentorshipRequest',
    value: function createMentorshipRequest(req, res) {
      const newId = parseInt(_sessionModel.default.length, 10) + 1;
      const _req$decoded = req.decoded;
      const { id } = _req$decoded;
      const { email } = _req$decoded;
      const _req$body = req.body;
      const { mentorId } = _req$body;
      const { questions } = _req$body;

      const _validateMentorSessio = (0, _createMentorshipRequest.default)(mentorId);
      const { valid } = _validateMentorSessio;
      const { errors } = _validateMentorSessio;

      if (!valid) {
        return res.status(400).json({
          status: '400',
          message: 'Validation errors',
          errors,
        });
      }

      const newSession = {
        sessionId: newId,
        mentorId,
        menteeId: id,
        questions,
        menteeEmail: email,
        status: 'Pending',
      };

      _sessionModel.default.push(newSession);

      return res.status(201).json({
        status: '201',
        message: 'Session created successfully!',
        data: newSession,
      });
    },
  }, {
    key: 'acceptMentorshipRequest',
    value: function acceptMentorshipRequest(req, res) {
      const { id } = req.decoded;
      const { sessionId } = req.params;

      const _validateSessionAccep = (0, _validateSessionAcceptReq.default)(id, sessionId);
      const { valid } = _validateSessionAccep;
      const { errors } = _validateSessionAccep;

      if (!valid) {
        return res.status(400).json({
          errors,
        });
      }

      const sessionExists = _sessionModel.default.find((item) => item.sessionid === Number(sessionId));

      if (sessionExists.status === 'Accepted!') {
        return res.json({
          message: 'Session already accepted',
        });
      }

      sessionExists.status = 'Accepted';
      return res.status(200).json({
        status: '200',
        data: {
          sessionId: sessionExists.id,
          mentorId: sessionExists.mentorId,
          menteeId: sessionExists.menteeId,
          questions: sessionExists.questions,
          menteeEmail: sessionExists.menteeEmail,
          status: 'Accepted!',
        },
      });
    },
  }, {
    key: 'rejectMentorshipRequest',
    value: function rejectMentorshipRequest(req, res) {
      const { id } = req.decoded;
      const { sessionId } = req.params;

      const _validateSessionRejec = (0, _validateSessionRejectReq.default)(id, sessionId);
      const { valid } = _validateSessionRejec;
      const { errors } = _validateSessionRejec;

      if (!valid) {
        return res.status(400).json({
          errors,
        });
      }

      const sessionExists = _sessionModel.default.find((item) => item.sessionId === Number(sessionId));

      if (sessionExists.status === 'Rejected') {
        return res.json({
          message: 'Session already Rejected',
        });
      }

      sessionExists.status = 'Accepted';
      return res.status(200).json({
        status: '200',
        data: {
          sessionId: sessionExists.id,
          mentorId: sessionExists.mentorId,
          menteeId: sessionExists.menteeId,
          questions: sessionExists.questions,
          menteeEmail: sessionExists.menteeEmail,
          status: 'Rejected',
        },
      });
    },
  }]);

  return SessionController;
}());

const _default = SessionController;
exports.default = _default;
