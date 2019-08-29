import express from 'express';
import mentorsController from '../controllers/mentorsController';

const mentorRouter = express.Router();

mentorRouter.post('/', (req, res) => res.send('user signup'));
mentorRouter.post('/:mentorId', (req, res) => res.send('user signin'));
mentorRouter.get('/', mentorsController.allMentors);
mentorRouter.get('/:mentorId', mentorsController.getSingleMentor);

export default mentorRouter;
