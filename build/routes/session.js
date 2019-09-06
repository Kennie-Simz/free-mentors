
Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

const _express = _interopRequireDefault(require('express'));

const _sessionController = _interopRequireDefault(require('../controllers/sessionController'));

const _middleware = _interopRequireDefault(require('../middleware'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const sessionRouter = _express.default.Router();

sessionRouter.post('/', _middleware.default, _sessionController.default.createMentorshipRequest);
sessionRouter.patch('/:sessionId/accept', _middleware.default, _sessionController.default.acceptMentorshipRequest);
sessionRouter.patch('/:sessionId/reject', _middleware.default, _sessionController.default.rejectMentorshipRequest); // sessionRouter.post('/:sessionId/review', (req, res) => res.send('review posted!'));
// sessionRouter.delete('/:sessionId/review', (req, res) => res.send('review deleted!'));
// sessionRouter.get('/:userId', (req, res) => res.send('get all mentor-session requests'));
// sessionRouter.get('/:mentorId', (req, res) => res.send('get all mentor-session requests'));

const _default = sessionRouter;
exports.default = _default;
