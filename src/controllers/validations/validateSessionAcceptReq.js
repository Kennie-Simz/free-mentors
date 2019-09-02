import Users from '../../models/authModel';
import Sessions from '../../models/sessionModel';

const validateMentorId = (mentorId, sessionId) => {
  const errors = {};

  const mentorExists = Users.find((item) => item.id === Number(mentorId));

  const sessionExists = Sessions.find((item) => item.sessionId === Number(sessionId));

  if (!mentorExists) {
    errors.mentorId = `User with ID ${mentorId} not found`;
  } else if (mentorExists.level !== 'Mentor') {
    errors.mentorId = `User with ID ${mentorId} is not a mentor`;
  }

  if (!sessionExists) {
    errors.sessionId = `Session with ID ${sessionId} not found`;
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
export default validateMentorId;
