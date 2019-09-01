import express from 'express';
import mentorsController from '../controllers/mentorsController';

const mentorRouter = express.Router();

mentorRouter.post('/signup', mentorsController.signUpMentor);
mentorRouter.post('/:mentorId', mentorsController.logMentor);
mentorRouter.get('/', mentorsController.allMentors);
mentorRouter.get('/:mentorId', mentorsController.getSingleMentor);

export default mentorRouter;
