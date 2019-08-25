import express from 'express';
import bodyParser from 'body-parser';
import config from './config';
import userRouter from './routes/user';
import mentorRouter from './routes/mentor';
import authRouter from './routes/auth';
import sessionRouter from './routes/session';

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

app.use('/api/v1/user', userRouter);
app.use('/api/v1/mentors', mentorRouter);
app.use('/api/v1/session', sessionRouter);
app.use('/api/v1/auth', authRouter);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
