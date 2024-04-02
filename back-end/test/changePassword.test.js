const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');
const bcrypt = require('bcryptjs');

const { expect } = chai;
chai.use(chaiHttp);

describe('POST /changePassword', () => {
    before(() => {
      process.env.USE_MOCK_DATA = 'true';
    });
  
    it('should change the user password successfully', (done) => {
      
      const userId = '1';
      const oldPassword = 'hashedpassword1';
      const newPassword = 'hashedpassword1';
  
      chai.request(server)
        .post('/api/changePassword')
        .send({ id: userId, oldPassword: oldPassword, newPassword: newPassword })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').eql('Password updated successfully in mock data');
          done();
        });
    });
  
    it('should return an error if the user is not found', (done) => {
      const userId = 'nonExistingId';
      const oldPassword = 'oldPassword';
      const newPassword = 'newPassword123';
  
      chai.request(server)
        .post('/api/changePassword')
        .send({ id: userId, oldPassword: oldPassword, newPassword: newPassword })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('message').eql('User not found in mock data');
          done();
        });
    });
  
    it('should return an error if the old password is incorrect', (done) => {
      const userId = '2';
      const oldPassword = 'wrongPassword';
      const newPassword = 'newPassword123';
  
      chai.request(server)
        .post('/api/changePassword')
        .send({ id: userId, oldPassword: oldPassword, newPassword: newPassword })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('message').eql('Old password is incorrect');
          done();
        });
    });

    after(() => {
      // Clean up environment
    });
  });