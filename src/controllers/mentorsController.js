import Users from '../models/authModel';

class MentorsController {
  static allMentors(req, res) {
    const mentors = Users.find((value) => value.level === 'Mentor');

    if (!mentors) {
      return res.status(404).json({
        status: 404,
        message: 'No mentors found',
      });
    }
    return res.status(200).json({
      status: 200,
      message: 'Mentors',
      data: mentors,
    });
  }
}

export default MentorsController;
