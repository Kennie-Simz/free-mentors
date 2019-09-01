import Users from '../../models/authModel';

const createMentorshipRequest = (mentorId) => {
  const errors = {};

  const mentorExists = Users.find((item) => item.id === Number(mentorId));

  if (!mentorExists) {
    errors.mentorId = `User with ID ${mentorId} not found`;
  } else if (mentorExists.level !== 'Mentor') {
    errors.mentorId = `User with ID ${mentorId} is not a mentor`;
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
export default createMentorshipRequest;
