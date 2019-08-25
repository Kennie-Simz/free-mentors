import express from 'express';
import AuthController from '../controllers/authController';

const authRouter = express.Router();

authRouter.post('/signup', AuthController.signUpUser);
authRouter.post('/signin', (req, res) => res.send('user signin/logged in!'));

export default authRouter;
