const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');
const bcrypt = require('bcryptjs');

const { expect } = chai;
chai.use(chaiHttp);

describe('POST /editUserProfile', () => {
    before(() => {
      process.env.USE_MOCK_DATA = 'true';
    });
  
    it('should update the user profile data successfully', (done) => {
      
      const userId = '10';
      const username = 'test10';
      const email = 'test10@gmail.com';
      const firstName = 'First10';
      const lastName = 'Last10';
      const phoneNumber = '1234567891';
  
      chai.request(server)
        .post('/api/editUserProfile')
        .send({ id: userId, username: username, email: email, firstName:firstName, lastName:lastName, phoneNumber:phoneNumber })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').eql('User profile updated successfully in mock data');
          done();
        });
    });

    it('should return an error if any of the fields are missing', (done) => {
        const userId = '10';
        const username = 'test10';
        const email = 'test10@gmail.com';
        const firstName = '';
        const lastName = 'Last10';
        const phoneNumber = '1234567891';

        chai.request(server)
            .post('/api/editUserProfile')
            .send({ id: userId, username: username, email: email, firstName: firstName, lastName: lastName, phoneNumber: phoneNumber })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error').eql('Missing parameters');
                done();
            });
    });
  
    it('should return an error if the user is not found', (done) => {
      const userId = 'nonExistingId';
      const username = 'test10';
      const email = 'test10@gmail.com';
      const firstName = 'First10';
      const lastName = 'Last10';
      const phoneNumber = '1234567891';
  
      chai.request(server)
        .post('/api/editUserProfile')
        .send({ id: userId, username: username, email: email, firstName:firstName, lastName:lastName, phoneNumber:phoneNumber })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('message').eql('User not found in mock data');
          done();
        });
    });
    
    
    after(() => {
      // Clean up environment
    });
  });