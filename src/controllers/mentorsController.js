import jwt from 'jsonwebtoken';
import Users from '../models/authModel';
import Mentors from '../models/mentorModel';
import config from '../config';

const ENV_VAR = config.get(process.env.NODE_ENV);

class MentorsController {
  static signUpMentor(req, res) {
    const newId = parseInt(Mentors.length, 10) + 1;
    const {
      email, firstName, lastName, password, bio, address, occupation, expertise,
    } = req.body;
    const isAdmin = false;
    const level = 'Mentor';
    const newMentor = {
      id: newId,
      email,
      firstName,
      lastName,
      password,
      bio,
      address,
      occupation,
      expertise,
      isAdmin,
      level,
    };
    Mentors.push(newMentor);
    const token = jwt.sign({ id: newId, isAdmin, level }, ENV_VAR.APP_SECRET, {
      expiresIn: '24h', // expires in 24 hours
    });
    return res.status(201).json({
      message: 'Mentor created successfully!',
      data: {
        token,
        message: 'Mentor created successfully!',
      },
    });
  }

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

  static getSingleMentor(req, res) {
    const { mentorId } = req.params;
    const mentor = Users.find((value) => value.id === Number(mentorId));

    if (!mentor) {
      return res.status(404).json({
        message: 'Error',
        error: 'User not found',
      });
    }
    if (mentor.level === 'Mentor') {
      return res.status(200).json({
        status: 200,
        message: 'Mentor',
        data: mentor,
      });
    }
    return res.status(404).json({
      status: 404,
      message: 'Given ID does not belong to a mentor',
    });
  }

  static logMentor(req, res) {
    const { email, password } = req.body;
    const logMentor = Mentors.find((item) => item.email === email);
    if (logMentor) {
      if (logMentor.password === password) {
        const token = jwt.sign(
          {
            id: logMentor.id,
            isAdmin: logMentor.isAdmin,
            level: logMentor.level,
          },
          ENV_VAR.APP_SECRET,
          {
            expiresIn: '24h', // expires in 24 hours
          },
        );
        res.json({
          status: '200',
          message: 'Mentor is successfully logged in!',
          data: {
            token,
            id: logMentor.id,
            firstName: logMentor.firstName,
            lastName: logMentor.lastName,
            email: logMentor.email,
          },
        });
      } else {
        res.status(400).json({
          status: '400',
          error: 'Password is incorrect',
        });
      }
    } else {
      res.status(400).json({
        status: '400',
        error: 'Email does not exist',
      });
    }
  }
}

export default MentorsController;
