import User from '../models/authModel';

class UserController {
  static allUsers(req, res) {
    return res.json({
      message: 'List of all users',
      users: User,
    });
  }

  static userToMentor(req, res) {
    const { isAdmin } = req.decoded;
    if (!isAdmin) {
      return res.status(401).json({
        status: 'error',
        message: 'Only admin can change to mentor',
      });
    }
    const { userId } = req.params;

    const user = User.find((value) => value.id === Number(userId));

    if (!user) {
      res.status(404).json({
        status: 404,
        error: 'user not found',
      });
    }
    user.level = 'Mentor';
    return res.status(201).json({
      status: 201,
      data: user,
    });
  }
}

export default UserController;
