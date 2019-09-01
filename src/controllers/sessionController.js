import Sessions from '../models/sessionModel';
import validateMentorSession from './validations/createMentorshipRequest';

class SessionController {
  static createMentorshipRequest(req, res) {
    const newId = parseInt(Sessions.length, 10) + 1;
    const { id, email } = req.decoded;
    const { mentorId, questions } = req.body;

    const { valid, errors } = validateMentorSession(mentorId);
    if (!valid) {
      return res.status(400).json({
        message: 'Validation errors',
        errors,
      });
    }

    const newSession = {
      sessionId: newId,
      mentorId,
      menteeId: id,
      questions,
      menteeEmail: email,
      status: 'Pending',
    };
    Sessions.push(newSession);

    return res.status(201).json({
      message: 'Session created successfully!',
      data: newSession,
    });
  }
}

export default SessionController;
