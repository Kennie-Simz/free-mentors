
Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

const _express = _interopRequireDefault(require('express'));

const _authController = _interopRequireDefault(require('../controllers/authController'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const authRouter = _express.default.Router();

authRouter.post('/signup', _authController.default.signUpUser);
authRouter.post('/signin', _authController.default.logUsers);
const _default = authRouter;
exports.default = _default;
