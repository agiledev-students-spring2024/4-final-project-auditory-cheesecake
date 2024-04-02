const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

const { expect } = chai;
chai.use(chaiHttp);

describe('GET /findUser', () => {
    it('should find a user', (done) => {
      // just checks if certain properties are present, change later to real validation
      const username = 'username';
      const sessionIdHash = 'skeyriw47g';
      const lastLogin = Date.now() + "";
  
      chai.request(server)
        .get('/api/findUser')
        .query({ username: username, sessionIdHash: sessionIdHash, lastLogin: lastLogin })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').eql('User found and validated');
          done();
        });
    });
  
    it('should return an error if the user is not found', (done) => {
      // no capacity to validate yet, for now just keep as whether or not certain properties r present, change later
      chai.request(server)
        .get('/api/findUser')
        .query({})
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('message').eql('Missing parameters');
          done();
        });
    });
  });