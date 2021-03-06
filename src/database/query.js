import dotenv from 'dotenv';

dotenv.config();

const users = {
  isUser:
    'INSERT INTO users( firstname, lastname, email , password, address ,bio, occupation, expertise) VALUES($1 ,$2, $3, $4, $5, $6, $7, $8) RETURNING *',
  isUserExist: 'SELECT * FROM users WHERE email = $1',
  findByid: 'SELECT * FROM users WHERE id=$1',
  userToMentor: 'UPDATE users SET isMentor=$1 WHERE id=$2 RETURNING *',
  isAdmin: "SELECT isadmin FROM users WHERE isadmin='true'",
  findAllMentors:
    "SELECT firstname, lastname, email, address, bio, occupation, expertise, isMentor, isAdmin FROM users WHERE isMentor='true'",
  getspecificMentor: "SELECT * FROM users WHERE level = 'Mentor' AND id = $1",
  isMentorExist: "SELECT * FROM users WHERE id=$1 and level = 'Mentor' = 'true'",
};
const sessions = {
  sessionExists: 'SELECT * FROM sessions WHERE  mentorId=$1 and questions=$2 and menteeId=$3',
  createMentorshipSession:
    'INSERT INTO sessions(mentorId, mentorEmail, menteeId, questions, menteeEmail) VALUES($1,$2,$3,$4,$5) RETURNING *',
};

export default { users, sessions };
