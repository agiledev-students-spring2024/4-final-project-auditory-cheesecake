const chai = require('chai');
const mongoose = require('mongoose');
const chaiHttp = require('chai-http');
const server = require('../app.js');
const mockUsers = require('../data/mock-users.json');
const connectDB = require('../database.js');

const { expect } = chai;
chai.use(chaiHttp);

before(async () => {
  await connectDB();
});

after(async () => {
  await mongoose.disconnect(); 
});


describe('POST /editUserProfile', () => {

  it('should update the user profile data successfully', (done) => {

    const userId = '661c104bf7a284374d5d64e7';
    const username = 'TEST1'; // testing case insensitivity
    const email = 'TEST1@GMAIL.COM'; // testing case insensitivity
    const firstName = 'Test1';
    const lastName = 'Testing1';
    const phoneNumber = '8582300302';

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
    const userId = '661c104bf7a284374d5d64e7';
    const username = 'TEST1'; // testing case insensitivity
    const email = 'TEST1@GMAIL.COM'; // testing case insensitivity
    const firstName = '';
    const lastName = 'Testing1';
    const phoneNumber = '8582300302';

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
    const username = 'TEST1'; // testing case insensitivity
    const email = 'TEST1@GMAIL.COM'; // testing case insensitivity
    const firstName = 'Test1';
    const lastName = 'Testing1';
    const phoneNumber = '8582300302';

    chai.request(server)
      .post('/api/editUserProfile')
      .send({ id: userId, username, email, firstName, lastName, phoneNumber })
      .end((err, res) => {
        expect(res).to.have.status(500);
        expect(res.body).to.have.property('message').eql('Failed to edit user profile');
        done();
      });
  });

  it('should return error if email is already in use by another account', (done) => {
    
    const userId = '661c104bf7a284374d5d64e7';
    const username = 'TEST1'; // testing case insensitivity
    const email = 'TEST@GMAIL.COM'; // testing case insensitivity
    const firstName = 'Test1';
    const lastName = 'Testing1';
    const phoneNumber = '8582300302';

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
    const userId = '661c104bf7a284374d5d64e7';
    const username = 'TEST'; // testing case insensitivity
    const email = 'TEST1@GMAIL.COM'; // testing case insensitivity
    const firstName = 'Test1';
    const lastName = 'Testing1';
    const phoneNumber = '8582300302';

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
    const userId = '661c104bf7a284374d5d64e7';
    const username = 'TEST1'; // testing case insensitivity
    const email = 'TEST1@GMAIL.COM'; // testing case insensitivity
    const firstName = 'Test1';
    const lastName = 'Testing1';
    const phoneNumber = '9089089080';

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