import dotenv from 'dotenv';
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
    pool.query(
      'SELECT * FROM users WHERE id = $1 AND level = $2',
      [mentorId, 'Mentor'],
      (err, results) => {
        if (results.rowCount < 1) {
          return res.status(404).json({
            status: 404,
            error: `Mentor with ID ${mentorId} not found`,
          });
        }
        return res.status(200).json({
          status: 200,
          data: results.rows,
        });
      },
    );
  }
}

export default MentorsController;
