
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

describe('Survey API', function () { 
  this.timeout(20000); 

  describe('/GET questions', function () { 
    it('it should GET all the questions', function (done) {
      chai.request(server)
        .get('/api/questions')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.eql(17); 
          done();
        });
    });
  });



  describe('/POST responses', function () {
    it('it should POST survey responses', function (done) { 

      const payload = {
        userId: "66180a2d837b08cb791f2361",
        responses:
        [
        { question: 'I confirm that I am 18 years or older', answer: 'Yes' },
        { question: 'How are you feeling today?', answer: 'Better than average' },
        { question: 'Who is your favorite artist?', answer: 'Drake' },
        { question: 'In the following questions, you will hear a song. Please rate that song out of 5 (1 is worst, 5 is best). If you need to listen to it again, hit the replay button!', answer: 'Proceed' },
        { question: 'Monday Monday', answer: '3' },
        { question: 'Symphony No. 3', answer: '3' },
        { question: 'Hell N Back', answer: '3' },
        { question: 'Beautiful People', answer: '3' },
        { question: 'Deeper Well', answer: '3' },
        { question: 'Tucson Too Late', answer: '3' },
        { question: 'Love Story', answer: '3' },
        { question: 'Cellophane', answer: '3' },
        { question: 'Sweet Child O Mine', answer: '3' },
        { question: 'Live Your Life', answer: '3' },
        { question: 'Miguel', answer: '3' },
        { question: 'Smells Like Teen Spirit', answer: '3' },
        { question: 'Texas Tornado', answer: '3' },
      ]};

      chai.request(server)
        .post('/api/responses')
        .send(payload)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message').eql('Responses received successfully!');
          done();
        });
    });
  });
});


