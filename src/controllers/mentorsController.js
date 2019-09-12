import dotenv from 'dotenv';
import Users from '../models/authModel';
import { runner } from '../database/index';

dotenv.config();

class MentorsController {
  static async allMentors(req, res) {
    try {
      const getMentors = 'SELECT * FROM users WHERE isMentor=true';
      const mentors = await runner(getMentors);

      if (!mentors[0]) {
        return res.status(404).json({
          status: 404,
          message: 'No mentors found',
        });
      }
      return res.status(200).json({
        status: 200,
        message: 'Mentors',
        data: mentors,
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
    // const mentors = Users.find((value) => value.level === 'Mentor');
  }

  static getSingleMentor(req, res) {
    const { mentorId } = req.params;
    const mentor = Users.find((value) => value.id === Number(mentorId));

    if (!mentor) {
      return res.status(404).json({
        message: 'Error',
        error: 'User not found',
      });
    }
    if (mentor.level === 'Mentor') {
      return res.status(200).json({
        status: 200,
        message: 'Mentor',
        data: mentor,
      });
    }
    return res.status(404).json({
      status: 404,
      message: 'Given ID does not belong to a mentor',
    });
  }
}

export default MentorsController;
