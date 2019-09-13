import pool from '../../database/database';

const createMentorshipRequest = (mentorId) => {
  const errors = {};

  pool.query(
    'SELECT * FROM users WHERE id = $1 AND  level = $2',
    [mentorId, 'Mentor'],
    (err, results) => {
      if (results.rowCount < 1) {
        errors.mentorId = `Mentor with ID ${mentorId} not found`;
      }
      return {
        errors,
        valid: Object.keys(errors).length < 1,
      };
    },
  );
};
export default createMentorshipRequest;
