import express from 'express';

const authRouter = express.Router();

authRouter.post('/signup', (req, res) => res.send('user signup/user created!'));
authRouter.post('/signin', (req, res) => res.send('user signin/logged in!'));

export default authRouter;
