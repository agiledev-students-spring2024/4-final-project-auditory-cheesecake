
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');


const { expect } = chai;
chai.use(chaiHttp);

describe('Survey API', () => {
  describe('/GET questions', () => {
    it('it should GET all the questions', (done) => {
      chai.request(server)
        .get('/api/questions')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.eql(5); 
          done();
        });
    });
  });

  describe('/POST responses', () => {
    it('it should POST survey responses', (done) => {
      const responses = [
        { question: 'I confirm that I am 18 years or older', answer: 'Yes' },
        { question: 'How are you feeling today?', answer: 'Better than average' },
        { question: 'Who is your favorite artist?', answer: 'Drake' },
        { question: 'Rate this song out of 5 (1 is worst, 5 is best)', answer: '4' },
        { question: 'Rate this song out of 5 (1 is worst, 5 is best)', answer: '3' },
      ];

      chai.request(server)
        .post('/api/responses')
        .send({responses: responses})
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message').eql('Responses received successfully!');
          done();
        });
    });
  });
});
