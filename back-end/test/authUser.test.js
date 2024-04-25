const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');
const jwt = require('jsonwebtoken');

const { expect } = chai;
chai.use(chaiHttp);

describe('POST /api/findUser', () => {
  it('should find and validate a user', (done) => {
    // Sample token generation for testing
    const token = jwt.sign({ username: 'username', sessionId: '123' }, 'yourSecretKey');
    chai.request(server)
    .post('/api/findUser')
    .send({ token })
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message').eql('User found and validated');
      expect(res.body.user).to.have.property('username').eql('username');
      done();
    });
  });
  
  it('should return an error if the token is missing', (done) => {
    chai.request(server)
    .post('/api/findUser')
    .send({})
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('message').eql('Missing parameters');
      done();
    });
  });
  
  it('should return an error if the session is not found or user does not match', (done) => {
    const token = jwt.sign({ username: 'wrongusername', sessionId: 'wrongsessionid' }, 'yourSecretKey');
    chai.request(server)
    .post('/api/findUser')
    .send({ token })
    .end((err, res) => {
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('message').eql('User session mismatch');
      done();
    });
  });
  
  it('should return an error if the token is invalid', (done) => {
    chai.request(server)
    .post('/api/findUser')
    .send({ token: 'invalidtoken' })
    .end((err, res) => {
      expect(res).to.have.status(401);
      expect(res.body).to.have.property('message').eql('Invalid token');
      done();
    });
  });
});
