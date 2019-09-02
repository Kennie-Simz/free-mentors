/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../src';
import config from '../src/config';

const ENV_VAR = config.get(process.env.NODE_ENV);

// configure chai
chai.use(chaiHttp);
chai.should();

describe('Mentors Project', () => {
  describe('Page not found', () => {
    it('should throw 404 on non existent URL', (done) => {
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
    it('should not sign in an non existent user', (done) => {
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
});
