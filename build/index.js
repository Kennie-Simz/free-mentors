
Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

const _express = _interopRequireDefault(require('express'));

const _bodyParser = _interopRequireDefault(require('body-parser'));

const _swaggerUiExpress = _interopRequireDefault(require('swagger-ui-express'));

const _config = _interopRequireDefault(require('./config'));

const _user = _interopRequireDefault(require('./routes/user'));

const _mentor = _interopRequireDefault(require('./routes/mentor'));

const _auth = _interopRequireDefault(require('./routes/auth'));

const _session = _interopRequireDefault(require('./routes/session'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const swaggerDocument = require('./swagger.json');

const ENV_VAR = _config.default.get(process.env.NODE_ENV);

const PORT = process.env.PORT || ENV_VAR.APP_PORT;
const app = (0, _express.default)();
app.use(_bodyParser.default.urlencoded({
  // Middleware
  extended: true,
}));
app.use(_bodyParser.default.json());
app.use('/api/v1/user', _user.default);
app.use('/api/v1/mentors', _mentor.default);
app.use('/api/v1/session', _session.default);
app.use('/api/v1/auth', _auth.default);
app.use('/api/v1/docs', _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(swaggerDocument));
app.use((req, res) => {
  res.status(404).json({
    status: '404',
    error: 'Page not found',
  });
}); // eslint-disable-next-line no-console

app.listen(PORT, () => console.log('App listening on port '.concat(PORT, '!')));
const _default = app;
exports.default = _default;
