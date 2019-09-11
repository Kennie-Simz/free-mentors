import Users from '../models/authModel';
import pool from '../database/database';

class MentorsController {
  static allMentors(req, res) {
    const mentors = Users.find((value) => value.level === 'Mentor');
    pool.query('SELECT * FROM mentors ORDER BY id ASC', (valid, errors) => {
      if (!valid) {
        return res.status(404).json({
          status: 404,
          message: 'No mentors found',
          errors,
        });
      }
      return res.status(200).json({
        status: 200,
        message: 'Mentors',
        data: mentors,
      });
    });
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
