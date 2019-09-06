import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import config from './config';
import userRouter from './routes/user';
import mentorRouter from './routes/mentor';
import authRouter from './routes/auth';
import sessionRouter from './routes/session';

const swaggerDocument = require('./swagger.json');

const ENV_VAR = config.get(process.env.NODE_ENV);

const PORT = process.env.PORT || ENV_VAR.APP_PORT;

const app = express();
app.use(
  bodyParser.urlencoded({
    // Middleware
    extended: true,
  }),
);

app.use(bodyParser.json());

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1/user', userRouter);
app.use('/api/v1/mentors', mentorRouter);
app.use('/api/v1/session', sessionRouter);
app.use('/api/v1/auth', authRouter);
app.use((req, res) => {
  res.status(404).json({
    status: '404',
    error: 'Page not found',
  });
});

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));

export default app;
