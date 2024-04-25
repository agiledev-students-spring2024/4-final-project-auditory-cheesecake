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

    const userId = '11';
    const username = 'TEST11'; // testing case insensitivity
    const email = 'TEST11@GMAIL.COM'; // testing case insensitivity
    const firstName = 'First11';
    const lastName = 'Last11';
    const phoneNumber = '1234567891';

    chai.request(server)
      .post('/api/editUserProfile')
      .send({ id: userId, username, email, firstName, lastName, phoneNumber })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').eql('User profile updated successfully');
        done();
      });
  });

  it('should return an error if any of the fields are missing', (done) => {
    const userId = '11';
    const username = 'test11';
    const email = 'test11@gmail.com';
    const firstName = '';
    const lastName = 'Last11';
    const phoneNumber = '1234567891';

    chai.request(server)
      .post('/api/editUserProfile')
      .send({ id: userId, username, email, firstName, lastName, phoneNumber })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error').eql('Missing parameters');
        done();
      });
  });

  it('should return an error if the user is not found', (done) => {
    const userId = 'nonExistingId';
    const username = 'test11';
    const email = 'test11@gmail.com';
    const firstName = 'First11';
    const lastName = 'Last11';
    const phoneNumber = '1234567891';

    chai.request(server)
      .post('/api/editUserProfile')
      .send({ id: userId, username, email, firstName, lastName, phoneNumber })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('message').eql('User not found');
        done();
      });
  });

  it('should return error if email is already in use by another account', (done) => {
    const userId = '11';
    const username = 'test11';
    const email = 'testuser1712074258415@example.com'; // This email is already in use
    const firstName = 'First11';
    const lastName = 'Last11';
    const phoneNumber = '1234567891';

    chai.request(server)
      .post('/api/editUserProfile')
      .send({ id: userId, username, email, firstName, lastName, phoneNumber })
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body).to.have.property('error').eql('Email already in use by another account.');
        done();
      });
  });

  it('should return error if username is already in use by another account', (done) => {
    const userId = '11';
    const username = 'testUser1712074258415'; // this username is already in use
    const email = 'test11@gmail.com';
    const firstName = 'First11';
    const lastName = 'Last11';
    const phoneNumber = '1234567891';

    chai.request(server)
      .post('/api/editUserProfile')
      .send({ id: userId, username, email, firstName, lastName, phoneNumber })
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body).to.have.property('error').eql('Username already in use by another account.');
        done();
      });
  });

  it('should return error if phone number is already in use by another account', (done) => {
    const userId = '11';
    const username = 'test11';
    const email = 'test11@gmail.com';
    const firstName = 'First11';
    const lastName = 'Last11';
    const phoneNumber = '1234561712074258415'; // this phone number is already in use

    chai.request(server)
      .post('/api/editUserProfile')
      .send({ id: userId, username, email, firstName, lastName, phoneNumber })
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body).to.have.property('error').eql('Phone number already in use by another account.');
        done();
      });
  });

  after(() => {
    // Clean up environment
  });
});