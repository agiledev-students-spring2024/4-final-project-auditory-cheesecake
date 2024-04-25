const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const server = require('../app'); 
const connectDB = require('../database.js'); 

const { expect } = chai;
chai.use(chaiHttp);

before(async () => {
    await connectDB();
  });
  
after(async () => {
    await mongoose.disconnect(); 
  });

describe('User Registration API', () => {
    before(() => {
        process.env.USE_MOCK_DATA = 'false';  //for testing with real data
    });

    describe('POST /register', () => {
        it('should register a new user successfully', (done) => {
            const uniqueIdentifier = Date.now();
            const newUser = {
                username: `testUser${uniqueIdentifier}`,
                email: `testuser${uniqueIdentifier}@example.com`,
                password: 'TestPass123!',
                firstName: 'Test',
                lastName: 'User',
                phoneNumber: `123456${uniqueIdentifier}`
            };

            chai.request(server)
                .post('/api/register') 
                .send(newUser)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.have.property('message').eql('User registered successfully');
                    done();
                });
        });

        it('should not register a user with an existing email', (done) => {
            const duplicateUser = {
                username: 'fac333',
                email: 'test2001@gmail.com',  //using the same email as above
                password: 'Test#2001',
                firstName: 'Fran',
                lastName: 'G',
                phoneNumber: '9999199999'
            };

            chai.request(server)
                .post('/api/register')  
                .send(duplicateUser)
                .end((err, res) => {
                    expect(res).to.have.status(409);
                    expect(res.body).to.have.property('message').eql('User already exists');
                    done();
                });
        });

        
    });

    after(() => {
        
    });
});
