import express from 'express';

const mentorRouter = express.Router();

mentorRouter.post('/', (req, res) => res.send('user signup'));
mentorRouter.post('/:mentorId', (req, res) => res.send('user signin'));
mentorRouter.get('/mentors', (req, res) => res.send('get all mentors'));
mentorRouter.get('/mentors/:mentorId', (req, res) => res.send('get a specific mentor'));

export default mentorRouter;
