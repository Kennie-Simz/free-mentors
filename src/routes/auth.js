import express from 'express';
import AuthController from '../controllers/authController';

const authRouter = express.Router();

authRouter.post('/signup', AuthController.signUpUser);
authRouter.post('/signin', AuthController.logUsers);

export default authRouter;
