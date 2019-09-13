/* eslint-disable no-multi-str */
/* eslint-disable consistent-return */
import pool from '../database';

class SessionController {
  static getSessionRequests(req, res) {
    pool.query('SELECT * FROM sessions', (err, results) => res.json({
      requests: results.rows,
    }));
  }

  static createMentorshipRequest(req, res) {
    const { id, email } = req.decoded;
    const { mentorId, questions } = req.body;

    pool.query(
      'SELECT * FROM users WHERE id = $1 AND level = $2',
      [mentorId, 'Mentor'],
      (err, results) => {
        if (results.rowCount < 1) {
          return res.status(400).json({
            status: 400,
            message: 'Mentor not found',
          });
        }
        pool.query(
          'INSERT INTO sessions\
          (mentorid, menteeid, questions, menteeemail, status)\
            VALUES ( $1, $2, $3, $4, $5) RETURNING *',
          [mentorId, id, questions, email, 'Pending'],
          (error, { rows }) => {
            if (error) {
              return res.status(401).json({
                status: 401,
                data: {
                  message: 'Unauthorized',
                  error,
                },
              });
            }

            return res.status(201).json({
              status: 201,
              data: {
                message: 'created successfuly',
                ...rows[0],
              },
            });
          },
        );
      },
    );
  }

  static acceptMentorshipRequest(req, res) {
    const { id } = req.decoded;
    const { sessionId } = req.params;

    pool.query(
      'SELECT * FROM sessions WHERE id = $1 AND mentorid = $2',
      [sessionId, id],
      (err, { rows }) => {
        if (rows.length === 0) {
          return res.status(400).json({
            status: 400,
            message: 'Mentorship session request not found',
          });
        }

        pool.query(
          'UPDATE sessions SET status = $1 WHERE id = $2 RETURNING *',
          ['Accepted', sessionId],
          (error, results) => res.status(200).json({
            data: {
              sessionId,
              message: results.rows,
            },
          }),
        );
      },
    );
  }

  static rejectMentorshipRequest(req, res) {
    const { id } = req.decoded;
    const { sessionId } = req.params;

    pool.query(
      'SELECT * FROM sessions WHERE id = $1 AND mentorid = $2',
      [sessionId, id],
      (err, { rows }) => {
        if (rows.length === 0) {
          return res.status(400).json({
            status: 400,
            data: { message: 'Mentorship session request not found' },
          });
        }

        pool.query(
          'UPDATE sessions SET status = $1 WHERE id = $2 RETURNING *',
          ['Rejected', sessionId],
          (errorr, results) => res.json({
            data: {
              message: results.rows,
            },
          }),
        );
      },
    );
  }
}

export default SessionController;
