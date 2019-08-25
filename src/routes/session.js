import express from 'express';

const sessionRouter = express.Router();

sessionRouter.post('/', (req, res) => res.send('create a mentor-session request'));
sessionRouter.patch('/:sessionId/accept', (req, res) => res.send('mentor accepted session request!'));
sessionRouter.patch('/:sessionId/reject', (req, res) => res.send('mentor rejected session request!'));
sessionRouter.post('/:sessionId/review', (req, res) => res.send('review posted!'));
sessionRouter.delete('/:sessionId/review', (req, res) => res.send('review deleted!'));
sessionRouter.get('/:userId', (req, res) => res.send('get all mentor-session requests'));
sessionRouter.get('/:mentorId', (req, res) => res.send('get all mentor-session requests'));

export default sessionRouter;
