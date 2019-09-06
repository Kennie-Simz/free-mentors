
Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

const _authModel = _interopRequireDefault(require('../models/authModel'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _defineProperties(target, props) { for (let i = 0; i < props.length; i++) { const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

const UserController =
/* #__PURE__ */
(function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, null, [{
    key: 'allUsers',
    value: function allUsers(req, res) {
      return res.json({
        status: 200,
        message: 'List of all users',
        users: _authModel.default,
      });
    },
  }, {
    key: 'userToMentor',
    value: function userToMentor(req, res) {
      const { isAdmin } = req.decoded;

      if (!isAdmin) {
        return res.status(401).json({
          status: 401,
          message: 'Only admin can change to mentor',
        });
      }

      const { userId } = req.params;

      const user = _authModel.default.find((item) => item.id === Number(userId));

      if (!user) {
        res.status(404).json({
          status: 404,
          error: 'user not found',
        });
      }

      user.level = 'Mentor';
      return res.status(201).json({
        status: 201,
        data: user,
      });
    },
  }]);

  return UserController;
}());

const _default = UserController;
exports.default = _default;
