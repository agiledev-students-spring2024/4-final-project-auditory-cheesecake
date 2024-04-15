const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');  

const { expect } = chai;
chai.use(chaiHttp);

describe('User Registration API', () => {
    before(() => {
        process.env.USE_MOCK_DATA = 'true';  //for testing with mock data
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
                    expect(res.body).to.have.property('message').eql('User registered successfully in mock data');
                    done();
                });
        });

        it('should not register a user with an existing email', (done) => {
            const duplicateUser = {
                username: 'testUser2',
                email: 'testuser@example.com',  //using the same email as above
                password: 'TestPass123!',
                firstName: 'Test',
                lastName: 'User2',
                phoneNumber: '0987654321'
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
