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
      'SELECT * FROM users WHERE id = $1',
      [mentorId],
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

      //   if (!mentor) {
      //     return res.status(404).json({
      //       message: 'Error',
      //       error: 'User not found',
      //     });
      //   }
      //   if (mentor.level === 'Mentor') {
      //     return res.status(200).json({
      //       status: 200,
      //       message: 'Mentor',
      //       data: mentor,
      //     });
      //   }
      //   return res.status(404).json({
      //     status: 404,
      //     message: 'Given ID does not belong to a mentor',
      //   });
      //
      // eslint-disable-next-line function-paren-newline
    );
  }
}

export default MentorsController;
