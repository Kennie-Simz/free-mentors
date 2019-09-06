
Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

const _express = _interopRequireDefault(require('express'));

const _middleware = _interopRequireDefault(require('../middleware'));

const _userController = _interopRequireDefault(require('../controllers/userController'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userRouter = _express.default.Router();

userRouter.patch('/:userId', _middleware.default, _userController.default.userToMentor);
userRouter.get('/users', _middleware.default, _userController.default.allUsers);
const _default = userRouter;
exports.default = _default;
