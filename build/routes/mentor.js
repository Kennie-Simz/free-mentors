
Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

const _express = _interopRequireDefault(require('express'));

const _mentorsController = _interopRequireDefault(require('../controllers/mentorsController'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const mentorRouter = _express.default.Router();

mentorRouter.get('/', _mentorsController.default.allMentors);
mentorRouter.get('/:mentorId', _mentorsController.default.getSingleMentor);
const _default = mentorRouter;
exports.default = _default;
