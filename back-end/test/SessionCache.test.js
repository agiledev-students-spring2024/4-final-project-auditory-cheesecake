const chai = require('chai');
const expect = chai.expect;
const SessionCache = require('../classes/SessionCache');

describe('SessionCache Tests', function() {
  let sessionCache;
  
  beforeEach(() => {
    // Initialize a new SessionCache before each test
    sessionCache = new SessionCache.constructor();
  });
  
  afterEach(() => {
    // Clear cache after each test
    sessionCache.flush();
  });
  
  it('should add and retrieve a session', function() {
    sessionCache.addSession('123', 'user123');
    const session = sessionCache.getSession('123');
    expect(session).to.not.be.null;
    expect(session.username).to.equal('user123');
  });
  
  it('should not retrieve an expired session', function(done) {
    sessionCache.addSession('expired', 'userExpired');
    // Simulate expiration by modifying the session data directly
    const modifiedSession = sessionCache.getSession('expired');
    modifiedSession.expiresAt = Date.now() - 1000; // set to expired
    sessionCache.cache.set('expired', modifiedSession);
    
    setTimeout(() => {
      const session = sessionCache.getSession('expired');
      expect(session).to.be.null;
      done();
    }, 1000);
  });
  
  it('should remove a session', function() {
    sessionCache.addSession('toRemove', 'userToRemove');
    expect(sessionCache.getSession('toRemove')).to.not.be.null;
    sessionCache.removeSession('toRemove');
    expect(sessionCache.getSession('toRemove')).to.be.null;
  });
  
  it('should handle attempts to add sessions without required parameters', function() {
    expect(() => sessionCache.addSession(null, 'userNoId')).to.throw('Session ID and username are required');
    expect(() => sessionCache.addSession('noUser', null)).to.throw('Session ID and username are required');
  });
  
  it('should flush all expired sessions', function() {
    sessionCache.addSession('session1', 'user1');
    sessionCache.addSession('session2', 'user2');
    // Expire session2 manually
    const modifiedSession = sessionCache.getSession('session2');
    modifiedSession.expiresAt = Date.now() - 1000; // set to expired
    sessionCache.cache.set('session2', modifiedSession);
    
    sessionCache.flushExpiredSessions();
    expect(sessionCache.getSession('session1')).to.not.be.null;
    expect(sessionCache.getSession('session2')).to.be.null;
  });
  
  it('should clear all sessions', function() {
    sessionCache.addSession('session1', 'user1');
    sessionCache.addSession('session2', 'user2');
    sessionCache.flush();
    expect(sessionCache.length()).to.equal(0);
  });
});