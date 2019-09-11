/* eslint-disable no-undef */
/* import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import app from '../src';

dotenv.config();

// configure chai
chai.use(chaiHttp);
chai.should();

describe('Mentors Project', () => {
  describe('Bearer token', () => {
    it('should load documentation', (done) => {
      chai
        .request(app)
        .get('/api/v1/docs')
        .end((req, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('should check auth token not provided', (done) => {
      chai
        .request(app)
        .get('/api/v1/user/users')
        .end((req, res) => {
          res.body.message.should.equal('No token provided');
          done();
        });
    });
    it('should reject invalid token', (done) => {
      const token = 'Invalid token';
      chai
        .request(app)
        .get('/api/v1/user/users')
        .set('Authorization', `Bearer ${token}`)
        .end((req, res) => {
          res.body.message.should.equal('Token is not valid');
          done();
        });
    });
  });
  describe('Page not found', () => {
    it('should throw 404 on non existent URLs', (done) => {
      chai
        .request(app)
        .get('/some/random/url')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
  describe('User Endpoint', () => {
    it('should get all users', (done) => {
      chai
        .request(app)
        .get('/api/v1/user/users')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('should allow admin to upgrade user to mentor', (done) => {
      const token = jwt.sign(
        {
          id: 1,
          isAdmin: true,
          level: 'Admin',
          email: 'random@admin.com',
        },
        ENV_VAR.APP_SECRET,
        {
          expiresIn: '24h', // expires in 24 hours
        },
      );
      chai
        .request(app)
        .patch('/api/v1/user/3')
        .set('Authorization', `Bearer ${token}`)
        .end((req, res) => {
          res.should.have.status(201);
          done();
        });
    });
  });
  describe('Auth Endpoint', () => {
    it('should sign up user', (done) => {
      const newUser = {
        firstName: 'Chris',
        lastName: 'Rolex',
        address: '123 abc place',
        occupation: 'senior dev',
        bio: 'not really known',
        expertise: 'advanced',
        email: 'chris@acde.com',
        password: '12345',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(newUser)
        .end((req, res) => {
          res.should.have.status(201);
          done();
        });
    });
    it('should reject same user signup', (done) => {
      const newUser = {
        firstName: 'Chris',
        lastName: 'Rolex',
        address: '123 abc place',
        occupation: 'senior dev',
        bio: 'not really known',
        expertise: 'advanced',
        email: 'chris@acde.com',
        password: '12345',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(newUser)
        .end((req, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('should sign in an existing user', (done) => {
      const newUser = {
        email: 'chris@acde.com',
        password: '12345',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(newUser)
        .end((req, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('should not sign in a non existent user', (done) => {
      const newUser = {
        email: 'chddris@acde.com',
        password: '12345',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(newUser)
        .end((req, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe('Mentors Endpoint', () => {
    it('should display all mentors', (done) => {
      chai
        .request(app)
        .get('/api/v1/mentors')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('should display specific mentor', (done) => {
      chai
        .request(app)
        .get('/api/v1/mentors/3')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('should test for a non existent mentor', (done) => {
      chai
        .request(app)
        .get('/api/v1/mentors/34')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe('Sessions endpoint', () => {
    const token = jwt.sign(
      {
        id: 1,
        isAdmin: true,
        level: 'Admin',
        email: 'random@admin.com',
      },
      ENV_VAR.APP_SECRET,
      {
        expiresIn: '24h', // expires in 24 hours
      },
    );
    it('should create session', (done) => {
      const newSession = {
        mentorId: 3,
        questions: 'Making my first session creation',
      };
      chai
        .request(app)
        .post('/api/v1/session')
        .set('Authorization', `Bearer ${token}`)
        .send(newSession)
        .end((req, res) => {
          res.should.have.status(201);
          done();
        });
    });
    it('should not create session if mentor doesnt exist', (done) => {
      const newSession = {
        mentorId: 332,
        questions: 'Making my first session creation',
      };
      chai
        .request(app)
        .post('/api/v1/session')
        .set('Authorization', `Bearer ${token}`)
        .send(newSession)
        .end((req, res) => {
          res.should.have.status(400);
          res.body.errors.mentorId.should.equal('User with ID 332 not found');
          done();
        });
    });
    it('should reject session acceptance if not mentor', (done) => {
      chai
        .request(app)
        .patch('/api/v1/session/1/accept')
        .set('Authorization', `Bearer ${token}`)
        .end((req, res) => {
          res.body.errors.mentorId.should.equal('User with ID 1 is not a mentor');
          done();
        });
    });
    it('should reject session acceptance if not mentor', (done) => {
      chai
        .request(app)
        .patch('/api/v1/session/13/accept')
        .set('Authorization', `Bearer ${token}`)
        .end((req, res) => {
          res.body.errors.mentorId.should.equal('User with ID 1 is not a mentor');
          done();
        });
    });

    it('should fail session rejection if not mentor', (done) => {
      chai
        .request(app)
        .patch('/api/v1/session/1/reject')
        .set('Authorization', `Bearer ${token}`)
        .end((req, res) => {
          res.body.errors.mentorId.should.equal('User with ID 1 is not a mentor');
          done();
        });
    });
  });
}); */
