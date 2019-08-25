import express from 'express';
import mentorsController from '../controllers/mentorsController';

const mentorRouter = express.Router();

mentorRouter.post('/', (req, res) => res.send('user signup'));
mentorRouter.post('/:mentorId', (req, res) => res.send('user signin'));
mentorRouter.get('/', mentorsController.allMentors);
mentorRouter.get('/mentors/:mentorId', (req, res) => res.send('get a specific mentor'));

export default mentorRouter;
