import express from 'express';

const userRouter = express.Router();

userRouter.patch('/:userId', (req, res) => res.send('user account changed to mentor'));

export default userRouter;
