import dotenv from 'dotenv';
import Users from '../models/authModel';
import pool from '../database/index';

dotenv.config();

class MentorsController {
  static allMentors(req, res) {
    pool.query('SELECT * FROM users WHERE level = $1', ['Mentor'], (err, results) => res.json({
      mentors: results.rows,
    }));
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
