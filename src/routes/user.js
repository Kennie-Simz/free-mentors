import express from 'express';
import AuthRequired from '../middleware';
import userController from '../controllers/userController';

const userRouter = express.Router();

userRouter.patch('/:userId', AuthRequired, userController.userToMentor);
userRouter.get('/users', AuthRequired, userController.allUsers);

export default userRouter;
