/* eslint-disable no-multi-str */
/* eslint-disable consistent-return */
import Sessions from '../models/sessionModel';
import validateSessionAcceptReq from './validations/validateSessionAcceptReq';
import validateSessionRejectReq from './validations/validateSessionRejectReq';
import pool from '../database';

class SessionController {
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
   VALUES ($1, $2, $3, $4, $5) RETURNING *',
          [mentorId, id, questions, email, 'Pending'],
          (error) => {
            if (error) {
              return res.status(401).json({
                status: 401,
                message: 'Unauthorized',
                error: error.detail,
              });
            }
            return res.json({
              data: results.rows,
            });
          },
        );
      },
    );
  }

  static acceptMentorshipRequest(req, res) {
    const { id } = req.decoded;
    const { sessionId } = req.params;

    const { valid, errors } = validateSessionAcceptReq(id, sessionId);
    if (!valid) {
      return res.status(400).json({
        errors,
      });
    }
    const sessionExists = Sessions.find((item) => item.sessionId === Number(sessionId));
    if (sessionExists) {
      if (sessionExists.status === 'Accepted!') {
        return res.json({
          message: 'Session already accepted',
        });
      }

      sessionExists.status = 'Accepted';
      return res.status(200).json({
        status: 200,
        data: {
          sessionId: sessionExists.id,
          mentorId: sessionExists.mentorId,
          menteeId: sessionExists.menteeId,
          questions: sessionExists.questions,
          menteeEmail: sessionExists.menteeEmail,
          status: 'Accepted!',
        },
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'session does not exist',
    });
  }

  static rejectMentorshipRequest(req, res) {
    const { id } = req.decoded;
    const { sessionId } = req.params;

    const { valid, errors } = validateSessionRejectReq(id, sessionId);
    if (!valid) {
      return res.status(400).json({
        errors,
      });
    }
    const sessionExists = Sessions.find((item) => item.sessionId === Number(sessionId));

    if (sessionExists.status === 'Rejected') {
      return res.json({
        message: 'Session already Rejected',
      });
    }

    sessionExists.status = 'Rejected';
    return res.status(200).json({
      status: 200,
      data: {
        sessionId: sessionExists.id,
        mentorId: sessionExists.mentorId,
        menteeId: sessionExists.menteeId,
        questions: sessionExists.questions,
        menteeEmail: sessionExists.menteeEmail,
        status: 'Rejected',
      },
    });
  }
}

export default SessionController;
