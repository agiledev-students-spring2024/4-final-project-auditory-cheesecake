const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');
const Session = require('../models/Session');
const SessionCache = require('../classes/SessionCache');

describe('Session Model Tests', function() {
  before(async function() {
    // Connect to a test database
    await mongoose.connect('mongodb+srv://cheese1:AuditoryCheesecake@auditorycheesecake.jtoc5ey.mongodb.net/?retryWrites=true&w=majority&appName=AuditoryCheesecake', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

after(async function() {
  // Disconnect from the test database
  await mongoose.disconnect();
});

beforeEach(async function() {
  // Clear the database and session cache before each test
  await Session.deleteMany({});
  SessionCache.flush();
});

it('should generate a unique session ID', async function() {
  const sessionId = await Session.generateSessionId();
  expect(sessionId).to.be.a('string');
  expect(sessionId.length).to.equal(64); // Hex string length from 32 bytes
});

it('should create a session', async function() {
  const username = 'testUser';
  const sessionId = await Session.createSession(username);
  const session = await Session.findOne({ sessionId: sessionId });
  expect(session).to.not.be.null;
  expect(session.username).to.equal(username);
});

it('should get an existing session', async function() {
  const username = 'testUser';
  const sessionId = await Session.createSession(username);
  const session = await Session.getSession(sessionId);
  expect(session).to.not.be.null;
  expect(session.username).to.equal(username);
});

it('should delete a session', async function() {
  const username = 'testUser';
  const sessionId = await Session.createSession(username);
  await Session.deleteSession(sessionId);
  const session = await Session.findOne({ sessionId: sessionId });
  expect(session).to.be.null;
});

it('should handle the removal of expired sessions', async function() {
  const username = 'testUser';
  // Creating a session that expires immediately
  const session = new Session({
    username,
    sessionId: await Session.generateSessionId(),
    expiresAt: new Date(Date.now() - 1000) // Set to expired
  });
  await session.save();
  
  await Session.flushExpiredSessions();
  const foundSession = await Session.findOne({ username: username });
  expect(foundSession).to.be.null;
});

it('should return null for an expired session when fetched', async function() {
  const username = 'testUser';
  const sessionId = await Session.generateSessionId();
  const session = new Session({
    username,
    sessionId,
    expiresAt: new Date(Date.now() - 1000) // Set to expired
  });
  await session.save();
  const fetchedSession = await Session.getSession(sessionId);
  expect(fetchedSession).to.be.null;
});
});
