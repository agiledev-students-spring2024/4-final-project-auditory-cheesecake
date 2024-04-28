const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../models/User');
const connectDB = require('../database.js');

const { expect } = chai;
chai.use(chaiHttp);

before(async () => {
  await connectDB();
});

after(async () => {
  await mongoose.disconnect(); 
});

describe('POST /changePassword', () => {
  let existingUserId;
  let nonExistingUserId = new mongoose.Types.ObjectId();

  before(async () => {
    const newUser = new User({
      username: 'testuser',
      email: 'test@example.com',
      phoneNumber: '9256677187',
      lastName: 'Chen',
      firstName: 'Sam',
      password: 'hashedpassword1'
    });

    const savedUser = await newUser.save();
    existingUserId = savedUser._id.toString();
  });
  
  it('should change the user password successfully', (done) => {
    const oldPassword = 'hashedpassword1';
    const newPassword = 'hashedpassword2';

    chai.request(server)
      .post('/api/changePassword')
      .send({ id: existingUserId, oldPassword: oldPassword, newPassword: newPassword })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').eql('Password updated successfully');
        done();
      });
  });
  
  it('should return an error if the user is not found', (done) => {
    const oldPassword = 'oldPassword';
    const newPassword = 'newPassword123';

    chai.request(server)
      .post('/api/changePassword')
      .send({ id: nonExistingUserId.toString(), oldPassword: oldPassword, newPassword: newPassword })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('message').eql('User not found');
        done();
      });
  });
  
  it('should return an error if the old password is incorrect', (done) => {
    const oldPassword = 'wrongPassword';
    const newPassword = 'newPassword123';

    chai.request(server)
      .post('/api/changePassword')
      .send({ id: existingUserId, oldPassword: oldPassword, newPassword: newPassword })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property('message').eql('Old password is incorrect');
        done();
      });
  });

  after(async () => {
    await User.findByIdAndDelete(existingUserId);
  });
});